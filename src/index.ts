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
        this.server.tool(
            "addPet",
            {
                pet: z.object({
                    name: z.string().describe("Pet name"),
                    photoUrls: z.array(z.string()).describe("List of photo URLs"),
                    category: z.object({
                        id: z.number().optional(),
                        name: z.string().optional(),
                    }).optional(),
                    tags: z.array(z.object({
                        id: z.number().optional(),
                        name: z.string().optional(),
                    })).optional(),
                    status: z.enum(["available", "pending", "sold"]).optional(),
                }).describe("Pet object to add"),
            },
            async ({ pet }) => {
                try {
                    const response = await fetch(`${this.baseUrl}/pet`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
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
            }
        );

        // Tool for updating a pet
        this.server.tool(
            "updatePet",
            {
                pet: z.object({
                    id: z.number().describe("Pet ID"),
                    name: z.string().optional(),
                    photoUrls: z.array(z.string()).optional(),
                    category: z.object({
                        id: z.number().optional(),
                        name: z.string().optional(),
                    }).optional(),
                    tags: z.array(z.object({
                        id: z.number().optional(),
                        name: z.string().optional(),
                    })).optional(),
                    status: z.enum(["available", "pending", "sold"]).optional(),
                }).describe("Pet object to update"),
            },
            async ({ pet }) => {
                try {
                    const response = await fetch(`${this.baseUrl}/pet`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
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
            }
        );

        // Tool for finding pets by status
        this.server.tool(
            "findPetsByStatus",
            {
                status: z.string().optional().describe("Status of pets"),
            },
            async ({ status }) => {
                try {
                    const response = await fetch(`${this.baseUrl}/pet/findByStatus?status=${status}`);
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
            }
        );

        // Tool for getting pet by ID
        this.server.tool(
            "getPetById",
            {
                petId: z.number().describe("ID of pet to return"),
            },
            async ({ petId }) => {
                try {
                    const response = await fetch(`${this.baseUrl}/pet/${petId}`);
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
            }
        );

        // Tool for deleting a pet
        this.server.tool(
            "deletePet",
            {
                petId: z.number().describe("ID of pet to delete"),
            },
            async ({ petId }) => {
                try {
                    const response = await fetch(`${this.baseUrl}/pet/${petId}`, {
                        method: 'DELETE',
                    });
                    if (!response.ok) throw new Error(`Pet not found`);
                    return { content: [{ type: "text", text: `Pet with ID ${petId} deleted successfully.` }] };
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