import type { IncomingMessage, ServerResponse } from "http";
import app from "../server";

export default function handler(
  req: IncomingMessage,
  res: ServerResponse
) {
  const originalUrl = req.url || "/";

  if (
    originalUrl !== "/api" &&
    !originalUrl.startsWith("/api/")
  ) {
    req.url = `/api${
      originalUrl.startsWith("/") ? "" : "/"
    }${originalUrl}`;
  }

  console.log("Vercel request:", req.method, req.url);

  return app(req as any, res as any);
}