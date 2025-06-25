import { McpAgent } from "agents/mcp";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

export class PetStoreMCP extends McpAgent {
    server = new McpServer({
        name: "Swagger Petstore",
        version: "1.0.12",
    });

    private baseUrl = "https://petstore3.swagger.io/api/v3";

    async init() {
        this.server.tool(
            "updatePet",
            { pet: z.object({
                id: z.number().int(),
                name: z.string(),
                photoUrls: z.array(z.string()),
                status: z.enum(["available", "pending", "sold"]),
            }) },
            async ({ pet }) => {
                try {
                    const response = await fetch(`${this.baseUrl}/pet`, {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(pet),
                    });
                    if (!response.ok) throw new Error(`Hiba a frissítés során: ${response.status}`);
                    const data = await response.json();
                    return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
                } catch (error) {
                    return { content: [{ type: "text", text: `Hiba: ${error instanceof Error ? error.message : String(error)}` }] };
                }
            }
        );

        this.server.tool(
            "addPet",
            { pet: z.object({
                name: z.string(),
                photoUrls: z.array(z.string()),
                status: z.enum(["available", "pending", "sold"]),
            }) },
            async ({ pet }) => {
                try {
                    const response = await fetch(`${this.baseUrl}/pet`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(pet),
                    });
                    if (!response.ok) throw new Error(`Hiba a hozzáadás során: ${response.status}`);
                    const data = await response.json();
                    return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
                } catch (error) {
                    return { content: [{ type: "text", text: `Hiba: ${error instanceof Error ? error.message : String(error)}` }] };
                }
            }
        );

        this.server.tool(
            "findPetsByStatus",
            { status: z.string().optional().default("available") },
            async ({ status }) => {
                try {
                    const response = await fetch(`${this.baseUrl}/pet/findByStatus?status=${status}`, {
                        method: "GET",
                    });
                    if (!response.ok) throw new Error(`Hiba a keresés során: ${response.status}`);
                    const data = await response.json();
                    return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
                } catch (error) {
                    return { content: [{ type: "text", text: `Hiba: ${error instanceof Error ? error.message : String(error)}` }] };
                }
            }
        );

        this.server.tool(
            "getPetById",
            { petId: z.number().int() },
            async ({ petId }) => {
                try {
                    const response = await fetch(`${this.baseUrl}/pet/${petId}`, {
                        method: "GET",
                    });
                    if (!response.ok) throw new Error(`Hiba a lekérdezés során: ${response.status}`);
                    const data = await response.json();
                    return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
                } catch (error) {
                    return { content: [{ type: "text", text: `Hiba: ${error instanceof Error ? error.message : String(error)}` }] };
                }
            }
        );

        this.server.tool(
            "deletePet",
            { petId: z.number().int() },
            async ({ petId }) => {
                try {
                    const response = await fetch(`${this.baseUrl}/pet/${petId}`, {
                        method: "DELETE",
                    });
                    if (!response.ok) throw new Error(`Hiba a törlés során: ${response.status}`);
                    return { content: [{ type: "text", text: `Kedvenc törölve: ${petId}` }] };
                } catch (error) {
                    return { content: [{ type: "text", text: `Hiba: ${error instanceof Error ? error.message : String(error)}` }] };
                }
            }
        );

        this.server.tool(
            "uploadFile",
            { petId: z.number().int(), additionalMetadata: z.string().optional() },
            async ({ petId, additionalMetadata }) => {
                try {
                    const formData = new FormData();
                    formData.append("file", new Blob(), "image.jpg");
                    if (additionalMetadata) formData.append("additionalMetadata", additionalMetadata);
                    const response = await fetch(`${this.baseUrl}/pet/${petId}/uploadImage`, {
                        method: "POST",
                        body: formData,
                    });
                    if (!response.ok) throw new Error(`Hiba a fájl feltöltése során: ${response.status}`);
                    const data = await response.json();
                    return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
                } catch (error) {
                    return { content: [{ type: "text", text: `Hiba: ${error instanceof Error ? error.message : String(error)}` }] };
                }
            }
        );

        this.server.tool(
            "getInventory",
            {},
            async () => {
                try {
                    const response = await fetch(`${this.baseUrl}/store/inventory`, {
                        method: "GET",
                    });
                    if (!response.ok) throw new Error(`Hiba a készlet lekérdezése során: ${response.status}`);
                    const data = await response.json();
                    return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
                } catch (error) {
                    return { content: [{ type: "text", text: `Hiba: ${error instanceof Error ? error.message : String(error)}` }] };
                }
            }
        );

        this.server.tool(
            "placeOrder",
            { order: z.object({
                petId: z.number().int(),
                quantity: z.number().int(),
                shipDate: z.string(),
                status: z.enum(["placed", "approved", "delivered"]),
                complete: z.boolean(),
            }) },
            async ({ order }) => {
                try {
                    const response = await fetch(`${this.baseUrl}/store/order`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(order),
                    });
                    if (!response.ok) throw new Error(`Hiba a rendelés leadása során: ${response.status}`);
                    const data = await response.json();
                    return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
                } catch (error) {
                    return { content: [{ type: "text", text: `Hiba: ${error instanceof Error ? error.message : String(error)}` }] };
                }
            }
        );

        this.server.tool(
            "getOrderById",
            { orderId: z.number().int() },
            async ({ orderId }) => {
                try {
                    const response = await fetch(`${this.baseUrl}/store/order/${orderId}`, {
                        method: "GET",
                    });
                    if (!response.ok) throw new Error(`Hiba a rendelés lekérdezése során: ${response.status}`);
                    const data = await response.json();
                    return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
                } catch (error) {
                    return { content: [{ type: "text", text: `Hiba: ${error instanceof Error ? error.message : String(error)}` }] };
                }
            }
        );

        this.server.tool(
            "deleteOrder",
            { orderId: z.number().int() },
            async ({ orderId }) => {
                try {
                    const response = await fetch(`${this.baseUrl}/store/order/${orderId}`, {
                        method: "DELETE",
                    });
                    if (!response.ok) throw new Error(`Hiba a rendelés törlése során: ${response.status}`);
                    return { content: [{ type: "text", text: `Rendelés törölve: ${orderId}` }] };
                } catch (error) {
                    return { content: [{ type: "text", text: `Hiba: ${error instanceof Error ? error.message : String(error)}` }] };
                }
            }
        );

        this.server.tool(
            "createUser",
            { user: z.object({
                username: z.string(),
                firstName: z.string(),
                lastName: z.string(),
                email: z.string().email(),
                password: z.string(),
                phone: z.string(),
                userStatus: z.number().int(),
            }) },
            async ({ user }) => {
                try {
                    const response = await fetch(`${this.baseUrl}/user`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(user),
                    });
                    if (!response.ok) throw new Error(`Hiba a felhasználó létrehozása során: ${response.status}`);
                    const data = await response.json();
                    return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
                } catch (error) {
                    return { content: [{ type: "text", text: `Hiba: ${error instanceof Error ? error.message : String(error)}` }] };
                }
            }
        );

        this.server.tool(
            "getUserByName",
            { username: z.string() },
            async ({ username }) => {
                try {
                    const response = await fetch(`${this.baseUrl}/user/${username}`, {
                        method: "GET",
                    });
                    if (!response.ok) throw new Error(`Hiba a felhasználó lekérdezése során: ${response.status}`);
                    const data = await response.json();
                    return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
                } catch (error) {
                    return { content: [{ type: "text", text: `Hiba: ${error instanceof Error ? error.message : String(error)}` }] };
                }
            }
        );

        this.server.tool(
            "updateUser",
            { username: z.string(), user: z.object({
                firstName: z.string(),
                lastName: z.string(),
                email: z.string().email(),
                password: z.string(),
                phone: z.string(),
            }) },
            async ({ username, user }) => {
                try {
                    const response = await fetch(`${this.baseUrl}/user/${username}`, {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(user),
                    });
                    if (!response.ok) throw new Error(`Hiba a felhasználó frissítése során: ${response.status}`);
                    return { content: [{ type: "text", text: `Felhasználó frissítve: ${username}` }] };
                } catch (error) {
                    return { content: [{ type: "text", text: `Hiba: ${error instanceof Error ? error.message : String(error)}` }] };
                }
            }
        );

        this.server.tool(
            "deleteUser",
            { username: z.string() },
            async ({ username }) => {
                try {
                    const response = await fetch(`${this.baseUrl}/user/${username}`, {
                        method: "DELETE",
                    });
                    if (!response.ok) throw new Error(`Hiba a felhasználó törlése során: ${response.status}`);
                    return { content: [{ type: "text", text: `Felhasználó törölve: ${username}` }] };
                } catch (error) {
                    return { content: [{ type: "text", text: `Hiba: ${error instanceof Error ? error.message : String(error)}` }] };
                }
            }
        );
    }
}

export default {
    fetch(request: Request, env: Env, ctx: ExecutionContext) {
        const url = new URL(request.url);

        if (url.pathname === "/sse" || url.pathname === "/sse/message") {
            return PetStoreMCP.serveSSE("/sse").fetch(request, env, ctx);
        }

        if (url.pathname === "/mcp") {
            return PetStoreMCP.serve("/mcp").fetch(request, env, ctx);
        }

        return new Response("Not found", { status: 404 });
    },
};