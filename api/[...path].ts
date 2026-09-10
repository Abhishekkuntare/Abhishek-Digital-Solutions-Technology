import type { IncomingMessage, ServerResponse } from "http";

import app from "../server";

export default function handler(

  req: IncomingMessage,

  res: ServerResponse

) {

  try {

    const originalUrl = req.url || "/";

    // Vercel catch-all can pass /leads instead of /api/leads.

    if (

      originalUrl !== "/api" &&

      !originalUrl.startsWith("/api/")

    ) {

      req.url = `/api${originalUrl.startsWith("/") ? "" : "/"}${originalUrl}`;

    }

    console.log("=== VERCEL API REQUEST ===");

    console.log("method:", req.method);

    console.log("url:", req.url);

    return app(req, res);

  } catch (error) {

    console.error("=== EXPRESS FUNCTION CRASH ===");

    console.error(error);

    if (!res.headersSent) {

      res.statusCode = 500;

      res.setHeader("Content-Type", "application/json");

      res.end(

        JSON.stringify({

          success: false,

          error: "Server function crashed",

          message:

            error instanceof Error ? error.message : String(error),

        })

      );

    }

  }

}