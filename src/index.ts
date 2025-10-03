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
        // Tool for updating an existing pet
        this.server.tool(
            "updatePet",
            {
                pet: z.object({
                    id: z.number().int().describe("ID of the pet"),
                    name: z.string().describe("Name of the pet"),
                    category: z.object({
                        id: z.number().int().describe("Category ID"),
                        name: z.string().describe("Category name")
                    }).optional(),
                    photoUrls: z.array(z.string()).describe("List of photo URLs"),
                    tags: z.array(z.object({
                        id: z.number().int().describe("Tag ID"),
                        name: z.string().describe("Tag name")
                    })).optional(),
                    status: z.enum(["available", "pending", "sold"]).optional().describe("Pet status")
                }),
            },
            async ({ pet }) => {
                try {
                    const response = await fetch(`${this.baseUrl}/pet`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(pet)
                    });
                    const result = await response.json();
                    return {
                        content: [{ type: "text", text: JSON.stringify(result, null, 2) }]
                    };
                } catch (error) {
                    return {
                        content: [{ type: "text", text: `Error: ${error instanceof Error ? error.message : String(error)}` }]
                    };
                }
            }
        );

        // Tool for adding a new pet
        this.server.tool(
            "addPet",
            {
                pet: z.object({
                    name: z.string().describe("Name of the pet"),
                    category: z.object({
                        id: z.number().int().describe("Category ID"),
                        name: z.string().describe("Category name")
                    }).optional(),
                    photoUrls: z.array(z.string()).describe("List of photo URLs"),
                    tags: z.array(z.object({
                        id: z.number().int().describe("Tag ID"),
                        name: z.string().describe("Tag name")
                    })).optional(),
                    status: z.enum(["available", "pending", "sold"]).optional().describe("Pet status")
                }),
            },
            async ({ pet }) => {
                try {
                    const response = await fetch(`${this.baseUrl}/pet`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(pet)
                    });
                    const result = await response.json();
                    return {
                        content: [{ type: "text", text: JSON.stringify(result, null, 2) }]
                    };
                } catch (error) {
                    return {
                        content: [{ type: "text", text: `Error: ${error instanceof Error ? error.message : String(error)}` }]
                    };
                }
            }
        );

        // Tool for finding pets by status
        this.server.tool(
            "findPetsByStatus",
            {
                status: z.string().optional().describe("Status of pets to filter by")
            },
            async ({ status }) => {
                try {
                    const response = await fetch(`${this.baseUrl}/pet/findByStatus?status=${status}`, {
                        method: 'GET'
                    });
                    const result = await response.json();
                    return {
                        content: [{ type: "text", text: JSON.stringify(result, null, 2) }]
                    };
                } catch (error) {
                    return {
                        content: [{ type: "text", text: `Error: ${error instanceof Error ? error.message : String(error)}` }]
                    };
                }
            }
        );

        // Tool for finding pets by tags
        this.server.tool(
            "findPetsByTags",
            {
                tags: z.array(z.string()).optional().describe("Tags to filter by")
            },
            async ({ tags }) => {
                try {
                    const response = await fetch(`${this.baseUrl}/pet/findByTags?tags=${tags.join(',')}`, {
                        method: 'GET'
                    });
                    const result = await response.json();
                    return {
                        content: [{ type: "text", text: JSON.stringify(result, null, 2) }]
                    };
                } catch (error) {
                    return {
                        content: [{ type: "text", text: `Error: ${error instanceof Error ? error.message : String(error)}` }]
                    };
                }
            }
        );

        // Tool for getting pet by ID
        this.server.tool(
            "getPetById",
            {
                petId: z.number().int().describe("ID of the pet to return")
            },
            async ({ petId }) => {
                try {
                    const response = await fetch(`${this.baseUrl}/pet/${petId}`, {
                        method: 'GET'
                    });
                    const result = await response.json();
                    return {
                        content: [{ type: "text", text: JSON.stringify(result, null, 2) }]
                    };
                } catch (error) {
                    return {
                        content: [{ type: "text", text: `Error: ${error instanceof Error ? error.message : String(error)}` }]
                    };
                }
            }
        );

        // Tool for updating a pet with form data
        this.server.tool(
            "updatePetWithForm",
            {
                petId: z.number().int().describe("ID of pet to update"),
                name: z.string().optional().describe("Name of pet"),
                status: z.string().optional().describe("Status of pet")
            },
            async ({ petId, name, status }) => {
                try {
                    const response = await fetch(`${this.baseUrl}/pet/${petId}`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                        body: new URLSearchParams({ name, status })
                    });
                    const result = await response.json();
                    return {
                        content: [{ type: "text", text: JSON.stringify(result, null, 2) }]
                    };
                } catch (error) {
                    return {
                        content: [{ type: "text", text: `Error: ${error instanceof Error ? error.message : String(error)}` }]
                    };
                }
            }
        );

        // Tool for deleting a pet
        this.server.tool(
            "deletePet",
            {
                petId: z.number().int().describe("ID of pet to delete"),
                api_key: z.string().optional().describe("API key")
            },
            async ({ petId, api_key }) => {
                try {
                    const response = await fetch(`${this.baseUrl}/pet/${petId}`, {
                        method: 'DELETE',
                        headers: { 'api_key': api_key || '' }
                    });
                    return {
                        content: [{ type: "text", text: `Pet deleted successfully` }]
                    };
                } catch (error) {
                    return {
                        content: [{ type: "text", text: `Error: ${error instanceof Error ? error.message : String(error)}` }]
                    };
                }
            }
        );

        // Tool for uploading an image
        this.server.tool(
            "uploadFile",
            {
                petId: z.number().int().describe("ID of pet to update"),
                additionalMetadata: z.string().optional().describe("Additional Metadata"),
                file: z.instanceof(File).describe("File to upload")
            },
            async ({ petId, additionalMetadata, file }) => {
                const formData = new FormData();
                formData.append("additionalMetadata", additionalMetadata);
                formData.append("file", file);
                try {
                    const response = await fetch(`${this.baseUrl}/pet/${petId}/uploadImage`, {
                        method: 'POST',
                        body: formData
                    });
                    const result = await response.json();
                    return {
                        content: [{ type: "text", text: JSON.stringify(result, null, 2) }]
                    };
                } catch (error) {
                    return {
                        content: [{ type: "text", text: `Error: ${error instanceof Error ? error.message : String(error)}` }]
                    };
                }
            }
        );

        // Tool for getting inventory
        this.server.tool(
            "getInventory",
            {},
            async () => {
                try {
                    const response = await fetch(`${this.baseUrl}/store/inventory`, {
                        method: 'GET'
                    });
                    const result = await response.json();
                    return {
                        content: [{ type: "text", text: JSON.stringify(result, null, 2) }]
                    };
                } catch (error) {
                    return {
                        content: [{ type: "text", text: `Error: ${error instanceof Error ? error.message : String(error)}` }]
                    };
                }
            }
        );

        // Tool for placing an order
        this.server.tool(
            "placeOrder",
            {
                order: z.object({
                    id: z.number().int().optional().describe("Order ID"),
                    petId: z.number().int().describe("Pet ID"),
                    quantity: z.number().int().describe("Quantity"),
                    shipDate: z.string().optional().describe("Shipping date"),
                    status: z.enum(["placed", "approved", "delivered"]).describe("Order status"),
                    complete: z.boolean().optional().describe("Is order complete")
                }),
            },
            async ({ order }) => {
                try {
                    const response = await fetch(`${this.baseUrl}/store/order`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(order)
                    });
                    const result = await response.json();
                    return {
                        content: [{ type: "text", text: JSON.stringify(result, null, 2) }]
                    };
                } catch (error) {
                    return {
                        content: [{ type: "text", text: `Error: ${error instanceof Error ? error.message : String(error)}` }]
                    };
                }
            }
        );

        // Tool for getting order by ID
        this.server.tool(
            "getOrderById",
            {
                orderId: z.number().int().describe("ID of order to fetch")
            },
            async ({ orderId }) => {
                try {
                    const response = await fetch(`${this.baseUrl}/store/order/${orderId}`, {
                        method: 'GET'
                    });
                    const result = await response.json();
                    return {
                        content: [{ type: "text", text: JSON.stringify(result, null, 2) }]
                    };
                } catch (error) {
                    return {
                        content: [{ type: "text", text: `Error: ${error instanceof Error ? error.message : String(error)}` }]
                    };
                }
            }
        );

        // Tool for deleting an order
        this.server.tool(
            "deleteOrder",
            {
                orderId: z.number().int().describe("ID of order to delete")
            },
            async ({ orderId }) => {
                try {
                    const response = await fetch(`${this.baseUrl}/store/order/${orderId}`, {
                        method: 'DELETE'
                    });
                    return {
                        content: [{ type: "text", text: `Order deleted successfully` }]
                    };
                } catch (error) {
                    return {
                        content: [{ type: "text", text: `Error: ${error instanceof Error ? error.message : String(error)}` }]
                    };
                }
            }
        );

        // Tool for creating a user
        this.server.tool(
            "createUser",
            {
                user: z.object({
                    id: z.number().int().optional().describe("User ID"),
                    username: z.string().describe("Username"),
                    firstName: z.string().describe("First name"),
                    lastName: z.string().describe("Last name"),
                    email: z.string().email().describe("Email address"),
                    password: z.string().describe("Password"),
                    phone: z.string().optional().describe("Phone number"),
                    userStatus: z.number().int().optional().describe("User status")
                }),
            },
            async ({ user }) => {
                try {
                    const response = await fetch(`${this.baseUrl}/user`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(user)
                    });
                    const result = await response.json();
                    return {
                        content: [{ type: "text", text: JSON.stringify(result, null, 2) }]
                    };
                } catch (error) {
                    return {
                        content: [{ type: "text", text: `Error: ${error instanceof Error ? error.message : String(error)}` }]
                    };
                }
            }
        );

        // Tool for creating users with a list
        this.server.tool(
            "createUsersWithListInput",
            {
                users: z.array(z.object({
                    id: z.number().int().optional().describe("User ID"),
                    username: z.string().describe("Username"),
                    firstName: z.string().describe("First name"),
                    lastName: z.string().describe("Last name"),
                    email: z.string().email().describe("Email address"),
                    password: z.string().describe("Password"),
                    phone: z.string().optional().describe("Phone number"),
                    userStatus: z.number().int().optional().describe("User status")
                })).describe("List of users to create"),
            },
            async ({ users }) => {
                try {
                    const response = await fetch(`${this.baseUrl}/user/createWithList`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(users)
                    });
                    const result = await response.json();
                    return {
                        content: [{ type: "text", text: JSON.stringify(result, null, 2) }]
                    };
                } catch (error) {
                    return {
                        content: [{ type: "text", text: `Error: ${error instanceof Error ? error.message : String(error)}` }]
                    };
                }
            }
        );

        // Tool for logging in
        this.server.tool(
            "loginUser",
            {
                username: z.string().describe("Username for login"),
                password: z.string().describe("Password for login")
            },
            async ({ username, password }) => {
                try {
                    const response = await fetch(`${this.baseUrl}/user/login?username=${username}&password=${password}`, {
                        method: 'GET'
                    });
                    const result = await response.json();
                    return {
                        content: [{ type: "text", text: JSON.stringify(result, null, 2) }]
                    };
                } catch (error) {
                    return {
                        content: [{ type: "text", text: `Error: ${error instanceof Error ? error.message : String(error)}` }]
                    };
                }
            }
        );

        // Tool for logging out
        this.server.tool(
            "logoutUser",
            {},
            async () => {
                try {
                    const response = await fetch(`${this.baseUrl}/user/logout`, {
                        method: 'GET'
                    });
                    return {
                        content: [{ type: "text", text: `Logged out successfully` }]
                    };
                } catch (error) {
                    return {
                        content: [{ type: "text", text: `Error: ${error instanceof Error ? error.message : String(error)}` }]
                    };
                }
            }
        );

        // Tool for getting user by username
        this.server.tool(
            "getUserByName",
            {
                username: z.string().describe("Username to fetch user details")
            },
            async ({ username }) => {
                try {
                    const response = await fetch(`${this.baseUrl}/user/${username}`, {
                        method: 'GET'
                    });
                    const result = await response.json();
                    return {
                        content: [{ type: "text", text: JSON.stringify(result, null, 2) }]
                    };
                } catch (error) {
                    return {
                        content: [{ type: "text", text: `Error: ${error instanceof Error ? error.message : String(error)}` }]
                    };
                }
            }
        );

        // Tool for updating user
        this.server.tool(
            "updateUser",
            {
                username: z.string().describe("Username of the user to update"),
                user: z.object({
                    id: z.number().int().optional().describe("User ID"),
                    username: z.string().describe("Username"),
                    firstName: z.string().describe("First name"),
                    lastName: z.string().describe("Last name"),
                    email: z.string().email().describe("Email address"),
                    password: z.string().describe("Password"),
                    phone: z.string().optional().describe("Phone number"),
                    userStatus: z.number().int().optional().describe("User status")
                }),
            },
            async ({ username, user }) => {
                try {
                    const response = await fetch(`${this.baseUrl}/user/${username}`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(user)
                    });
                    return {
                        content: [{ type: "text", text: `User updated successfully` }]
                    };
                } catch (error) {
                    return {
                        content: [{ type: "text", text: `Error: ${error instanceof Error ? error.message : String(error)}` }]
                    };
                }
            }
        );

        // Tool for deleting user
        this.server.tool(
            "deleteUser",
            {
                username: z.string().describe("Username of the user to delete")
            },
            async ({ username }) => {
                try {
                    const response = await fetch(`${this.baseUrl}/user/${username}`, {
                        method: 'DELETE'
                    });
                    return {
                        content: [{ type: "text", text: `User deleted successfully` }]
                    };
                } catch (error) {
                    return {
                        content: [{ type: "text", text: `Error: ${error instanceof Error ? error.message : String(error)}` }]
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