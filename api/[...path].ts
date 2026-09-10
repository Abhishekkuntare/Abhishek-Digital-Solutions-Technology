import type { IncomingMessage, ServerResponse } from "node:http";
import app from "../server";

export default function handler(
  req: IncomingMessage,
  res: ServerResponse
) {
  console.log("=== API FUNCTION ===");
  console.log("method:", req.method);
  console.log("url:", req.url);

  return app(req as any, res as any);
}