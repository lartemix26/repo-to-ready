import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { PRODUCTS } from "@/lib/catalog";

export default defineTool({
  name: "list_products",
  title: "Consultar productos",
  description: "Consultar el catálogo de productos y precios en euros, opcionalmente por categoría.",
  inputSchema: { category: z.enum(["carnes", "empanadas", "pastas", "vinos"]).optional().describe("Categoría; omitir para consultar todo el catálogo.") },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ category }) => {
    const products = PRODUCTS.filter((p) => !category || p.cat === category).map((p) => ({ id: p.id, category: p.cat, name: p.name, description: p.desc, price: p.price, currency: "EUR", unit: p.unit ?? "pack" }));
    return { content: [{ type: "text", text: products.map((p) => `${p.id}: ${p.name} — ${p.price} EUR / ${p.unit}. ${p.description}`).join("\n") }], structuredContent: { products } };
  },
});