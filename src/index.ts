import { McpAgent } from "agents/mcp";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

// Define our MCP agent with API tools
export class MyMCP extends McpAgent {
    server = new McpServer({
        name: "Swagger Petstore API",
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
                    name: z.string().describe("Pet name"),
                    category: z.object({
                        id: z.number().optional(),
                        name: z.string().optional(),
                    }).optional(),
                    photoUrls: z.array(z.string()).describe("Array of photo URLs"),
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
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
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
                    id: z.number().describe("Pet ID"),
                    name: z.string().optional(),
                    category: z.object({
                        id: z.number().optional(),
                        name: z.string().optional(),
                    }).optional(),
                    photoUrls: z.array(z.string()).optional(),
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
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                        },
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
                status: z.string().optional().describe("Status values to filter by"),
            },
            async ({ status }) => {
                try {
                    const response = await fetch(`${this.baseUrl}/pet/findByStatus?status=${status || 'available'}`);
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
                tags: z.array(z.string()).optional().describe("Tags to filter by"),
            },
            async ({ tags }) => {
                try {
                    const response = await fetch(`${this.baseUrl}/pet/findByTags?tags=${tags ? tags.join(',') : ''}`);
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
                petId: z.number().describe("ID of the pet to return"),
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
                petId: z.number().describe("ID of pet that needs to be updated"),
                name: z.string().optional().describe("Name of pet that needs to be updated"),
                status: z.string().optional().describe("Status of pet that needs to be updated"),
            },
            async ({ petId, name, status }) => {
                try {
                    const response = await fetch(`${this.baseUrl}/pet/${petId}?name=${name || ''}&status=${status || ''}`, {
                        method: "POST",
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
                petId: z.number().describe("Pet id to delete"),
                api_key: z.string().optional().describe("API key for authorization"),
            },
            async ({ petId, api_key }) => {
                try {
                    const response = await fetch(`${this.baseUrl}/pet/${petId}`, {
                        method: "DELETE",
                        headers: { "api_key": api_key || '' },
                    });
                    return {
                        content: [{ type: "text", text: `Pet deleted` }],
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
                petId: z.number().describe("ID of pet to update"),
                additionalMetadata: z.string().optional().describe("Additional Metadata"),
                file: z.instanceof(File).describe("File to upload"),
            },
            async ({ petId, additionalMetadata, file }) => {
                const formData = new FormData();
                formData.append("file", file);
                if (additionalMetadata) formData.append("additionalMetadata", additionalMetadata);
                try {
                    const response = await fetch(`${this.baseUrl}/pet/${petId}/uploadImage`, {
                        method: "POST",
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
                    petId: z.number().describe("Pet ID"),
                    quantity: z.number().describe("Order quantity"),
                    shipDate: z.string().describe("Shipping date"),
                    status: z.enum(["placed", "approved", "delivered"]).describe("Order status"),
                    complete: z.boolean().describe("Is the order complete?"),
                }),
            },
            async ({ order }) => {
                try {
                    const response = await fetch(`${this.baseUrl}/store/order`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
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
                orderId: z.number().describe("ID of order to fetch"),
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
                orderId: z.number().describe("ID of order to delete"),
            },
            async ({ orderId }) => {
                try {
                    const response = await fetch(`${this.baseUrl}/store/order/${orderId}`, {
                        method: "DELETE",
                    });
                    return {
                        content: [{ type: "text", text: `Order deleted` }],
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
                    username: z.string().describe("User's username"),
                    firstName: z.string().optional(),
                    lastName: z.string().optional(),
                    email: z.string().email().describe("User's email"),
                    password: z.string().describe("User's password"),
                    phone: z.string().optional(),
                    userStatus: z.number().optional().describe("User status"),
                }),
            },
            async ({ user }) => {
                try {
                    const response = await fetch(`${this.baseUrl}/user`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
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
                    username: z.string().describe("User's username"),
                    firstName: z.string().optional(),
                    lastName: z.string().optional(),
                    email: z.string().email().describe("User's email"),
                    password: z.string().describe("User's password"),
                    phone: z.string().optional(),
                    userStatus: z.number().optional().describe("User status"),
                })).describe("List of users"),
            },
            async ({ users }) => {
                try {
                    const response = await fetch(`${this.baseUrl}/user/createWithList`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
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
                username: z.string().describe("The user name for login"),
                password: z.string().describe("The password for login"),
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
                        content: [{ type: "text", text: `User logged out` }],
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
                username: z.string().describe("The name that needs to be fetched"),
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
                username: z.string().describe("Username of the user to update"),
                user: z.object({
                    id: z.number().optional(),
                    username: z.string().describe("User's username"),
                    firstName: z.string().optional(),
                    lastName: z.string().optional(),
                    email: z.string().email().describe("User's email"),
                    password: z.string().describe("User's password"),
                    phone: z.string().optional(),
                    userStatus: z.number().optional().describe("User status"),
                }),
            },
            async ({ username, user }) => {
                try {
                    const response = await fetch(`${this.baseUrl}/user/${username}`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(user),
                    });
                    return {
                        content: [{ type: "text", text: `User updated` }],
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
                username: z.string().describe("Username of the user to delete"),
            },
            async ({ username }) => {
                try {
                    const response = await fetch(`${this.baseUrl}/user/${username}`, {
                        method: "DELETE",
                    });
                    return {
                        content: [{ type: "text", text: `User deleted` }],
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