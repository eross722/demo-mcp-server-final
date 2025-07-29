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
        // Tool for adding a new pet
        this.server.tool("addPet", {
            pet: z.object({
                name: z.string(),
                photoUrls: z.array(z.string()),
                status: z.enum(["available", "pending", "sold"]).optional(),
            }).describe("Pet object to add"),
        }, async ({ pet }) => {
            try {
                const response = await fetch(`${this.baseUrl}/pet`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(pet),
                });
                const result = await response.json();
                if (!response.ok) throw new Error(result.message);
                return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
            } catch (error) {
                return {
                    content: [{
                        type: "text",
                        text: `Error: ${error instanceof Error ? error.message : String(error)}`,
                    }],
                };
            }
        });

        // Tool for updating an existing pet
        this.server.tool("updatePet", {
            petId: z.number().describe("ID of the pet to update"),
            pet: z.object({
                name: z.string(),
                photoUrls: z.array(z.string()),
                status: z.enum(["available", "pending", "sold"]).optional(),
            }).describe("Updated pet object"),
        }, async ({ petId, pet }) => {
            try {
                const response = await fetch(`${this.baseUrl}/pet`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(pet),
                });
                const result = await response.json();
                if (!response.ok) throw new Error(result.message);
                return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
            } catch (error) {
                return {
                    content: [{
                        type: "text",
                        text: `Error: ${error instanceof Error ? error.message : String(error)}`,
                    }],
                };
            }
        });

        // Tool for finding pets by status
        this.server.tool("findPetsByStatus", {
            status: z.string().optional().describe("Comma separated string of status values"),
        }, async ({ status }) => {
            try {
                const response = await fetch(`${this.baseUrl}/pet/findByStatus?status=${status}`, {
                    method: "GET",
                });
                const result = await response.json();
                if (!response.ok) throw new Error(result.message);
                return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
            } catch (error) {
                return {
                    content: [{
                        type: "text",
                        text: `Error: ${error instanceof Error ? error.message : String(error)}`,
                    }],
                };
            }
        });

        // Tool for getting a pet by ID
        this.server.tool("getPetById", {
            petId: z.number().describe("ID of the pet to retrieve"),
        }, async ({ petId }) => {
            try {
                const response = await fetch(`${this.baseUrl}/pet/${petId}`, {
                    method: "GET",
                });
                const result = await response.json();
                if (!response.ok) throw new Error(result.message);
                return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
            } catch (error) {
                return {
                    content: [{
                        type: "text",
                        text: `Error: ${error instanceof Error ? error.message : String(error)}`,
                    }],
                };
            }
        });

        // Tool for deleting a pet
        this.server.tool("deletePet", {
            petId: z.number().describe("ID of the pet to delete"),
        }, async ({ petId }) => {
            try {
                const response = await fetch(`${this.baseUrl}/pet/${petId}`, {
                    method: "DELETE",
                });
                if (!response.ok) throw new Error(`Failed to delete pet with ID ${petId}`);
                return { content: [{ type: "text", text: `Pet with ID ${petId} deleted successfully.` }] };
            } catch (error) {
                return {
                    content: [{
                        type: "text",
                        text: `Error: ${error instanceof Error ? error.message : String(error)}`,
                    }],
                };
            }
        });

        // Tool for uploading an image
        this.server.tool("uploadFile", {
            petId: z.number().describe("ID of the pet to update"),
            additionalMetadata: z.string().optional().describe("Additional Metadata"),
            file: z.instanceof(File).describe("File to upload"),
        }, async ({ petId, additionalMetadata, file }) => {
            try {
                const formData = new FormData();
                formData.append("file", file);
                if (additionalMetadata) {
                    formData.append("additionalMetadata", additionalMetadata);
                }
                const response = await fetch(`${this.baseUrl}/pet/${petId}/uploadImage`, {
                    method: "POST",
                    body: formData,
                });
                const result = await response.json();
                if (!response.ok) throw new Error(result.message);
                return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
            } catch (error) {
                return {
                    content: [{
                        type: "text",
                        text: `Error: ${error instanceof Error ? error.message : String(error)}`,
                    }],
                };
            }
        });

        // Tool for creating an order
        this.server.tool("placeOrder", {
            order: z.object({
                petId: z.number(),
                quantity: z.number(),
                shipDate: z.string().optional(),
                status: z.enum(["placed", "approved", "delivered"]).optional(),
                complete: z.boolean().optional(),
            }).describe("Order object to create"),
        }, async ({ order }) => {
            try {
                const response = await fetch(`${this.baseUrl}/store/order`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(order),
                });
                const result = await response.json();
                if (!response.ok) throw new Error(result.message);
                return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
            } catch (error) {
                return {
                    content: [{
                        type: "text",
                        text: `Error: ${error instanceof Error ? error.message : String(error)}`,
                    }],
                };
            }
        });

        // Tool for getting an order by ID
        this.server.tool("getOrderById", {
            orderId: z.number().describe("ID of the order to retrieve"),
        }, async ({ orderId }) => {
            try {
                const response = await fetch(`${this.baseUrl}/store/order/${orderId}`, {
                    method: "GET",
                });
                const result = await response.json();
                if (!response.ok) throw new Error(result.message);
                return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
            } catch (error) {
                return {
                    content: [{
                        type: "text",
                        text: `Error: ${error instanceof Error ? error.message : String(error)}`,
                    }],
                };
            }
        });

        // Tool for deleting an order
        this.server.tool("deleteOrder", {
            orderId: z.number().describe("ID of the order to delete"),
        }, async ({ orderId }) => {
            try {
                const response = await fetch(`${this.baseUrl}/store/order/${orderId}`, {
                    method: "DELETE",
                });
                if (!response.ok) throw new Error(`Failed to delete order with ID ${orderId}`);
                return { content: [{ type: "text", text: `Order with ID ${orderId} deleted successfully.` }] };
            } catch (error) {
                return {
                    content: [{
                        type: "text",
                        text: `Error: ${error instanceof Error ? error.message : String(error)}`,
                    }],
                };
            }
        });

        // Tool for creating a user
        this.server.tool("createUser", {
            user: z.object({
                username: z.string(),
                firstName: z.string(),
                lastName: z.string(),
                email: z.string().email(),
                password: z.string(),
                phone: z.string(),
                userStatus: z.number().optional(),
            }).describe("User object to create"),
        }, async ({ user }) => {
            try {
                const response = await fetch(`${this.baseUrl}/user`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(user),
                });
                const result = await response.json();
                if (!response.ok) throw new Error(result.message);
                return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
            } catch (error) {
                return {
                    content: [{
                        type: "text",
                        text: `Error: ${error instanceof Error ? error.message : String(error)}`,
                    }],
                };
            }
        });

        // Tool for getting a user by username
        this.server.tool("getUserByName", {
            username: z.string().describe("Username of the user to retrieve"),
        }, async ({ username }) => {
            try {
                const response = await fetch(`${this.baseUrl}/user/${username}`, {
                    method: "GET",
                });
                const result = await response.json();
                if (!response.ok) throw new Error(result.message);
                return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
            } catch (error) {
                return {
                    content: [{
                        type: "text",
                        text: `Error: ${error instanceof Error ? error.message : String(error)}`,
                    }],
                };
            }
        });

        // Tool for updating a user
        this.server.tool("updateUser", {
            username: z.string().describe("Username of the user to update"),
            user: z.object({
                firstName: z.string().optional(),
                lastName: z.string().optional(),
                email: z.string().email().optional(),
                password: z.string().optional(),
                phone: z.string().optional(),
                userStatus: z.number().optional(),
            }).describe("Updated user object"),
        }, async ({ username, user }) => {
            try {
                const response = await fetch(`${this.baseUrl}/user/${username}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(user),
                });
                if (!response.ok) throw new Error(`Failed to update user with username ${username}`);
                return { content: [{ type: "text", text: `User ${username} updated successfully.` }] };
            } catch (error) {
                return {
                    content: [{
                        type: "text",
                        text: `Error: ${error instanceof Error ? error.message : String(error)}`,
                    }],
                };
            }
        });

        // Tool for deleting a user
        this.server.tool("deleteUser", {
            username: z.string().describe("Username of the user to delete"),
        }, async ({ username }) => {
            try {
                const response = await fetch(`${this.baseUrl}/user/${username}`, {
                    method: "DELETE",
                });
                if (!response.ok) throw new Error(`Failed to delete user with username ${username}`);
                return { content: [{ type: "text", text: `User ${username} deleted successfully.` }] };
            } catch (error) {
                return {
                    content: [{
                        type: "text",
                        text: `Error: ${error instanceof Error ? error.message : String(error)}`,
                    }],
                };
            }
        });
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