import { createFileRoute } from "@tanstack/react-router";
import fs from "node:fs";
import path from "node:path";
import { INITIAL_CHAPTERS } from "@/data/diary-content";
import { containsPrototypePollution, isPathInside, MAX_STORE_PAYLOAD_BYTES } from "@/lib/security";

function getStorePath(): string {
  return path.resolve(process.cwd(), "src/data/diary-store.json");
}

export const Route = createFileRoute("/api/public/diary-store")({
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
          console.warn("[diary-store] Read error:", e);
        }
        return Response.json({ chapters: INITIAL_CHAPTERS });
      },

      POST: async ({ request }) => {
        try {
          // Validate content length
          const contentLength = Number(request.headers.get("content-length") || "0");
          if (contentLength > MAX_STORE_PAYLOAD_BYTES) {
            return Response.json({ error: "Payload exceeds 2MB maximum limit" }, { status: 413 });
          }

          let body: { chapters?: unknown };
          try {
            body = await request.json();
          } catch {
            return Response.json({ error: "Invalid JSON body" }, { status: 400 });
          }

          if (!body || !Array.isArray(body.chapters)) {
            return Response.json({ error: "Chapters array required" }, { status: 400 });
          }

          // Prototype pollution defense
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
              { chapters: body.chapters, updatedAt: new Date().toISOString() },
              null,
              2,
            ),
            "utf-8",
          );
          return Response.json({ ok: true, count: body.chapters.length });
        } catch (err) {
          console.error("[diary-store] Save error:", err);
          return Response.json({ error: "Failed to persist diary data" }, { status: 500 });
        }
      },
    },
  },
});
