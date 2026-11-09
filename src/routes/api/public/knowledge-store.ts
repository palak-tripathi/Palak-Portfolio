import { createFileRoute } from "@tanstack/react-router";
import fs from "node:fs";
import path from "node:path";
import { containsPrototypePollution, isPathInside, MAX_STORE_PAYLOAD_BYTES } from "@/lib/security";

function getKnowledgePath(): string {
  return path.resolve(process.cwd(), "src/data/palak-knowledge.json");
}

export const Route = createFileRoute("/api/public/knowledge-store")({
  server: {
    handlers: {
      GET: async () => {
        try {
          const filePath = getKnowledgePath();
          if (fs.existsSync(filePath)) {
            const raw = fs.readFileSync(filePath, "utf-8");
            return Response.json(JSON.parse(raw));
          }
        } catch (e) {
          console.warn("[knowledge-store] Read error:", e);
        }
        return Response.json({ error: "Knowledge base not found" }, { status: 404 });
      },

      POST: async ({ request }) => {
        try {
          const contentLength = Number(request.headers.get("content-length") || "0");
          if (contentLength > MAX_STORE_PAYLOAD_BYTES) {
            return Response.json({ error: "Payload exceeds 2MB maximum limit" }, { status: 413 });
          }

          let body: unknown;
          try {
            body = await request.json();
          } catch {
            return Response.json({ error: "Invalid JSON body" }, { status: 400 });
          }

          if (!body || typeof body !== "object") {
            return Response.json({ error: "Expected object body" }, { status: 400 });
          }

          if (containsPrototypePollution(body)) {
            return Response.json(
              { error: "Malicious payload detected: prototype pollution" },
              { status: 400 },
            );
          }

          const filePath = getKnowledgePath();
          const dataDir = path.resolve(process.cwd(), "src", "data");
          if (!isPathInside(dataDir, filePath)) {
            return Response.json({ error: "Invalid storage target" }, { status: 403 });
          }

          if (!fs.existsSync(dataDir)) {
            fs.mkdirSync(dataDir, { recursive: true });
          }

          fs.writeFileSync(filePath, JSON.stringify(body, null, 2), "utf-8");
          return Response.json({
            ok: true,
            updatedAt: new Date().toISOString(),
          });
        } catch (err) {
          console.error("[knowledge-store] Save error:", err);
          return Response.json({ error: "Failed to save knowledge base" }, { status: 500 });
        }
      },
    },
  },
});
