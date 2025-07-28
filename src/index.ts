import { McpAgent } from "agents/mcp";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

// Define our MCP agent with API tools
export class MyMCP extends McpAgent {
    server = new McpServer({
        name: "Swagger Petstore",
        version: "1.0.0",
    });

    private baseUrl = "http://petstore.swagger.io/v2";

    async init() {
        // Tool for finding pets by status
        this.server.tool(
            "findPetsByStatus",
            {
                status: z.array(z.enum(["available", "pending", "sold"])).describe("Status values that need to be considered for filter"),
            },
            async ({ status }) => {
                try {
                    const response = await fetch(`${this.baseUrl}/pet/findByStatus/MultipleExamples?status=${status.join(',')}`);
                    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                    const data = await response.json();
                    return {
                        content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
                    };
                } catch (error) {
                    return {
                        content: [
                            {
                                type: "text",
                                text: `Error: ${error instanceof Error ? error.message : String(error)}`,
                            },
                        ],
                    };
                }
            }
        );

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
                }).describe("Pet object that needs to be added to the store"),
            },
            async ({ pet }) => {
                try {
                    const response = await fetch(`${this.baseUrl}/pet`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(pet),
                    });
                    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                    const data = await response.json();
                    return {
                        content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
                    };
                } catch (error) {
                    return {
                        content: [
                            {
                                type: "text",
                                text: `Error: ${error instanceof Error ? error.message : String(error)}`,
                            },
                        ],
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