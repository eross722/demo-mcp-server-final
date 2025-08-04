import { McpAgent } from "agents/mcp";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

// Define our MCP agent with API tools
export class MyMCP extends McpAgent {
    server = new McpServer({
        name: "Swagger Petstore - OpenAPI 3.0",
        version: "1.0.12",
    });

    private baseUrl = "https://petstore3.swagger.io/api/v3";

    async init() {
        // MCP tools based on OpenAPI endpoints
        this.server.tool(
            "addPet",
            {
                pet: z.object({
                    id: z.number().optional(),
                    name: z.string().nonempty(),
                    category: z.object({
                        id: z.number().optional(),
                        name: z.string().optional(),
                    }).optional(),
                    photoUrls: z.array(z.string()).nonempty(),
                    tags: z.array(z.object({
                        id: z.number().optional(),
                        name: z.string().optional(),
                    })).optional(),
                    status: z.enum(["available", "pending", "sold"]).optional(),
                }),
            },
            async ({ pet }) => {
                try {
                    const response = await fetch(`${this.baseUrl}/pet`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(pet),
                    });
                    const data = await response.json();
                    return {
                        content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
                    };
                } catch (error) {
                    return {
                        content: [{
                            type: "text",
                            text: `Error: ${error instanceof Error ? error.message : String(error)}`,
                        }],
                    };
                }
            }
        );

        this.server.tool(
            "updatePet",
            {
                pet: z.object({
                    id: z.number().nonnegative(),
                    name: z.string().nonempty(),
                    category: z.object({
                        id: z.number().optional(),
                        name: z.string().optional(),
                    }).optional(),
                    photoUrls: z.array(z.string()).nonempty(),
                    tags: z.array(z.object({
                        id: z.number().optional(),
                        name: z.string().optional(),
                    })).optional(),
                    status: z.enum(["available", "pending", "sold"]).optional(),
                }),
            },
            async ({ pet }) => {
                try {
                    const response = await fetch(`${this.baseUrl}/pet`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(pet),
                    });
                    const data = await response.json();
                    return {
                        content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
                    };
                } catch (error) {
                    return {
                        content: [{
                            type: "text",
                            text: `Error: ${error instanceof Error ? error.message : String(error)}`,
                        }],
                    };
                }
            }
        );

        this.server.tool(
            "findPetsByStatus",
            {
                status: z.string().optional().default("available"),
            },
            async ({ status }) => {
                try {
                    const response = await fetch(`${this.baseUrl}/pet/findByStatus?status=${status}`);
                    const data = await response.json();
                    return {
                        content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
                    };
                } catch (error) {
                    return {
                        content: [{
                            type: "text",
                            text: `Error: ${error instanceof Error ? error.message : String(error)}`,
                        }],
                    };
                }
            }
        );

        this.server.tool(
            "findPetsByTags",
            {
                tags: z.array(z.string()).optional(),
            },
            async ({ tags }) => {
                try {
                    const response = await fetch(`${this.baseUrl}/pet/findByTags?tags=${tags.join(',')}`);
                    const data = await response.json();
                    return {
                        content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
                    };
                } catch (error) {
                    return {
                        content: [{
                            type: "text",
                            text: `Error: ${error instanceof Error ? error.message : String(error)}`,
                        }],
                    };
                }
            }
        );

        this.server.tool(
            "getPetById",
            {
                petId: z.number().nonnegative(),
            },
            async ({ petId }) => {
                try {
                    const response = await fetch(`${this.baseUrl}/pet/${petId}`);
                    const data = await response.json();
                    return {
                        content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
                    };
                } catch (error) {
                    return {
                        content: [{
                            type: "text",
                            text: `Error: ${error instanceof Error ? error.message : String(error)}`,
                        }],
                    };
                }
            }
        );

        this.server.tool(
            "updatePetWithForm",
            {
                petId: z.number().nonnegative(),
                name: z.string().optional(),
                status: z.string().optional(),
            },
            async ({ petId, name, status }) => {
                try {
                    const response = await fetch(`${this.baseUrl}/pet/${petId}`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                        body: new URLSearchParams({ name, status }).toString(),
                    });
                    const data = await response.json();
                    return {
                        content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
                    };
                } catch (error) {
                    return {
                        content: [{
                            type: "text",
                            text: `Error: ${error instanceof Error ? error.message : String(error)}`,
                        }],
                    };
                }
            }
        );

        this.server.tool(
            "deletePet",
            {
                petId: z.number().nonnegative(),
                api_key: z.string().optional(),
            },
            async ({ petId, api_key }) => {
                try {
                    const response = await fetch(`${this.baseUrl}/pet/${petId}`, {
                        method: 'DELETE',
                        headers: { 'api_key': api_key || '' },
                    });
                    return {
                        content: [{ type: "text", text: JSON.stringify({ message: "Pet deleted" }, null, 2) }],
                    };
                } catch (error) {
                    return {
                        content: [{
                            type: "text",
                            text: `Error: ${error instanceof Error ? error.message : String(error)}`,
                        }],
                    };
                }
            }
        );

        this.server.tool(
            "uploadFile",
            {
                petId: z.number().nonnegative(),
                additionalMetadata: z.string().optional(),
                file: z.instanceof(File),
            },
            async ({ petId, additionalMetadata, file }) => {
                const formData = new FormData();
                formData.append('file', file);
                if (additionalMetadata) formData.append('additionalMetadata', additionalMetadata);
                try {
                    const response = await fetch(`${this.baseUrl}/pet/${petId}/uploadImage`, {
                        method: 'POST',
                        body: formData,
                    });
                    const data = await response.json();
                    return {
                        content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
                    };
                } catch (error) {
                    return {
                        content: [{
                            type: "text",
                            text: `Error: ${error instanceof Error ? error.message : String(error)}`,
                        }],
                    };
                }
            }
        );

        this.server.tool(
            "getInventory",
            {},
            async () => {
                try {
                    const response = await fetch(`${this.baseUrl}/store/inventory`);
                    const data = await response.json();
                    return {
                        content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
                    };
                } catch (error) {
                    return {
                        content: [{
                            type: "text",
                            text: `Error: ${error instanceof Error ? error.message : String(error)}`,
                        }],
                    };
                }
            }
        );

        this.server.tool(
            "placeOrder",
            {
                order: z.object({
                    id: z.number().optional(),
                    petId: z.number().nonnegative(),
                    quantity: z.number().nonnegative(),
                    shipDate: z.string().optional(),
                    status: z.enum(["placed", "approved", "delivered"]).optional(),
                    complete: z.boolean().optional(),
                }),
            },
            async ({ order }) => {
                try {
                    const response = await fetch(`${this.baseUrl}/store/order`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(order),
                    });
                    const data = await response.json();
                    return {
                        content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
                    };
                } catch (error) {
                    return {
                        content: [{
                            type: "text",
                            text: `Error: ${error instanceof Error ? error.message : String(error)}`,
                        }],
                    };
                }
            }
        );

        this.server.tool(
            "getOrderById",
            {
                orderId: z.number().nonnegative(),
            },
            async ({ orderId }) => {
                try {
                    const response = await fetch(`${this.baseUrl}/store/order/${orderId}`);
                    const data = await response.json();
                    return {
                        content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
                    };
                } catch (error) {
                    return {
                        content: [{
                            type: "text",
                            text: `Error: ${error instanceof Error ? error.message : String(error)}`,
                        }],
                    };
                }
            }
        );

        this.server.tool(
            "deleteOrder",
            {
                orderId: z.number().nonnegative(),
            },
            async ({ orderId }) => {
                try {
                    const response = await fetch(`${this.baseUrl}/store/order/${orderId}`, {
                        method: 'DELETE',
                    });
                    return {
                        content: [{ type: "text", text: JSON.stringify({ message: "Order deleted" }, null, 2) }],
                    };
                } catch (error) {
                    return {
                        content: [{
                            type: "text",
                            text: `Error: ${error instanceof Error ? error.message : String(error)}`,
                        }],
                    };
                }
            }
        );

        this.server.tool(
            "createUser",
            {
                user: z.object({
                    id: z.number().optional(),
                    username: z.string().nonempty(),
                    firstName: z.string().optional(),
                    lastName: z.string().optional(),
                    email: z.string().email(),
                    password: z.string().nonempty(),
                    phone: z.string().optional(),
                    userStatus: z.number().optional(),
                }),
            },
            async ({ user }) => {
                try {
                    const response = await fetch(`${this.baseUrl}/user`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(user),
                    });
                    const data = await response.json();
                    return {
                        content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
                    };
                } catch (error) {
                    return {
                        content: [{
                            type: "text",
                            text: `Error: ${error instanceof Error ? error.message : String(error)}`,
                        }],
                    };
                }
            }
        );

        this.server.tool(
            "createUsersWithListInput",
            {
                users: z.array(z.object({
                    id: z.number().optional(),
                    username: z.string().nonempty(),
                    firstName: z.string().optional(),
                    lastName: z.string().optional(),
                    email: z.string().email(),
                    password: z.string().nonempty(),
                    phone: z.string().optional(),
                    userStatus: z.number().optional(),
                })),
            },
            async ({ users }) => {
                try {
                    const response = await fetch(`${this.baseUrl}/user/createWithList`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(users),
                    });
                    const data = await response.json();
                    return {
                        content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
                    };
                } catch (error) {
                    return {
                        content: [{
                            type: "text",
                            text: `Error: ${error instanceof Error ? error.message : String(error)}`,
                        }],
                    };
                }
            }
        );

        this.server.tool(
            "loginUser",
            {
                username: z.string().optional(),
                password: z.string().optional(),
            },
            async ({ username, password }) => {
                try {
                    const response = await fetch(`${this.baseUrl}/user/login?username=${username}&password=${password}`);
                    const data = await response.json();
                    return {
                        content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
                    };
                } catch (error) {
                    return {
                        content: [{
                            type: "text",
                            text: `Error: ${error instanceof Error ? error.message : String(error)}`,
                        }],
                    };
                }
            }
        );

        this.server.tool(
            "logoutUser",
            {},
            async () => {
                try {
                    const response = await fetch(`${this.baseUrl}/user/logout`);
                    return {
                        content: [{ type: "text", text: JSON.stringify({ message: "User logged out" }, null, 2) }],
                    };
                } catch (error) {
                    return {
                        content: [{
                            type: "text",
                            text: `Error: ${error instanceof Error ? error.message : String(error)}`,
                        }],
                    };
                }
            }
        );

        this.server.tool(
            "getUserByName",
            {
                username: z.string().nonempty(),
            },
            async ({ username }) => {
                try {
                    const response = await fetch(`${this.baseUrl}/user/${username}`);
                    const data = await response.json();
                    return {
                        content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
                    };
                } catch (error) {
                    return {
                        content: [{
                            type: "text",
                            text: `Error: ${error instanceof Error ? error.message : String(error)}`,
                        }],
                    };
                }
            }
        );

        this.server.tool(
            "updateUser",
            {
                username: z.string().nonempty(),
                user: z.object({
                    id: z.number().optional(),
                    username: z.string().nonempty(),
                    firstName: z.string().optional(),
                    lastName: z.string().optional(),
                    email: z.string().email(),
                    password: z.string().nonempty(),
                    phone: z.string().optional(),
                    userStatus: z.number().optional(),
                }),
            },
            async ({ username, user }) => {
                try {
                    const response = await fetch(`${this.baseUrl}/user/${username}`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(user),
                    });
                    return {
                        content: [{ type: "text", text: JSON.stringify({ message: "User updated" }, null, 2) }],
                    };
                } catch (error) {
                    return {
                        content: [{
                            type: "text",
                            text: `Error: ${error instanceof Error ? error.message : String(error)}`,
                        }],
                    };
                }
            }
        );

        this.server.tool(
            "deleteUser",
            {
                username: z.string().nonempty(),
            },
            async ({ username }) => {
                try {
                    const response = await fetch(`${this.baseUrl}/user/${username}`, {
                        method: 'DELETE',
                    });
                    return {
                        content: [{ type: "text", text: JSON.stringify({ message: "User deleted" }, null, 2) }],
                    };
                } catch (error) {
                    return {
                        content: [{
                            type: "text",
                            text: `Error: ${error instanceof Error ? error.message : String(error)}`,
                        }],
                    };
                }
            }
        );
    }
}

export default {
    fetch(request: Request, env: Env, ctx: ExecutionContext) {
        const url = new URL(request.url);

        if (url.pathname === "/sse" || url.pathname === "/sse/message") {
            return MyMCP.serveSSE("/sse").fetch(request, env, ctx);
        }

        if (url.pathname === "/mcp") {
            return MyMCP.serve("/mcp").fetch(request, env, ctx);
        }

        return new Response("Not found", { status: 404 });
    },
};