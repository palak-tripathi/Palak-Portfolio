import { createFileRoute } from "@tanstack/react-router";
import fs from "node:fs";
import path from "node:path";
import { INITIAL_CERTIFICATES } from "@/data/certificates-content";
import { containsPrototypePollution, isPathInside, MAX_STORE_PAYLOAD_BYTES } from "@/lib/security";

function getStorePath(): string {
  return path.resolve(process.cwd(), "src/data/certificates-store.json");
}

export const Route = createFileRoute("/api/public/certificates-store")({
  server: {
    handlers: {
      GET: async () => {
        try {
          const filePath = getStorePath();
          if (fs.existsSync(filePath)) {
            const raw = fs.readFileSync(filePath, "utf-8");
            const data = JSON.parse(raw);
            return Response.json(data);
          }
        } catch (e) {
          console.warn("[certificates-store] Read error:", e);
        }
        return Response.json({ certificates: INITIAL_CERTIFICATES });
      },

      POST: async ({ request }) => {
        try {
          const contentLength = Number(request.headers.get("content-length") || "0");
          if (contentLength > MAX_STORE_PAYLOAD_BYTES) {
            return Response.json({ error: "Payload exceeds 2MB maximum limit" }, { status: 413 });
          }

          let body: { certificates?: unknown };
          try {
            body = await request.json();
          } catch {
            return Response.json({ error: "Invalid JSON body" }, { status: 400 });
          }

          if (!body || !Array.isArray(body.certificates)) {
            return Response.json({ error: "Certificates array required" }, { status: 400 });
          }

          if (containsPrototypePollution(body)) {
            return Response.json(
              { error: "Malicious payload detected: prototype pollution" },
              { status: 400 },
            );
          }

          const filePath = getStorePath();
          const dataDir = path.resolve(process.cwd(), "src", "data");
          if (!isPathInside(dataDir, filePath)) {
            return Response.json({ error: "Invalid storage target" }, { status: 403 });
          }

          if (!fs.existsSync(dataDir)) {
            fs.mkdirSync(dataDir, { recursive: true });
          }

          fs.writeFileSync(
            filePath,
            JSON.stringify(
              {
                certificates: body.certificates,
                updatedAt: new Date().toISOString(),
              },
              null,
              2,
            ),
            "utf-8",
          );
          return Response.json({ ok: true, count: body.certificates.length });
        } catch (err) {
          console.error("[certificates-store] Save error:", err);
          return Response.json({ error: "Failed to persist certificates data" }, { status: 500 });
        }
      },
    },
  },
});
