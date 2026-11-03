import { proxyBazarDorRequest } from "@/lib/api/proxy";

export async function GET() {
  return proxyBazarDorRequest("/categories");
}
