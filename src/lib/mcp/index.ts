import { auth, defineMcp } from "@lovable.dev/mcp-js";
import listProducts from "./tools/list-products";

const projectRef = import.meta.env["VITE_SUPABASE_PROJECT_ID"] ?? "project-ref-unset";
export default defineMcp({
  name: "los-de-ajuera",
  title: "Los-de-ajuera",
  version: "0.1.0",
  instructions: "Consultar el catálogo de Los de Ajuera. Los precios son los que muestra la web; la disponibilidad se confirma al pedir. No se pueden enviar pedidos, pagar ni consultar datos personales mediante este servidor.",
  auth: auth.oauth.issuer({ issuer: `https://${projectRef}.supabase.co/auth/v1`, acceptedAudiences: "authenticated", requireOAuthClientClaim: true }),
  tools: [listProducts],
});