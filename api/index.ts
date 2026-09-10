import type { IncomingMessage, ServerResponse } from "http";
import app from "../server";

export const config = {
  maxDuration: 30,
  api: {
    bodyParser: false,
  },
};

export default function handler(req: IncomingMessage, res: ServerResponse) {
  const forwardedUri = req.headers["x-forwarded-uri"];
  const originalPath = Array.isArray(forwardedUri) ? forwardedUri[0] : forwardedUri;

  if (originalPath && (req.url === "/api" || req.url === "/api/" || req.url === "/")) {
    req.url = originalPath;
  }

  return app(req, res);
}