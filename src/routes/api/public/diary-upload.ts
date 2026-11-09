import { createFileRoute } from "@tanstack/react-router";
import fs from "node:fs";
import path from "node:path";
import { isPathInside, MAX_UPLOAD_FILE_BYTES, validateMediaUpload } from "@/lib/security";

export const Route = createFileRoute("/api/public/diary-upload")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const contentType = request.headers.get("content-type") || "";
          if (!contentType.includes("multipart/form-data")) {
            return Response.json({ error: "Expected multipart/form-data" }, { status: 400 });
          }

          const formData = await request.formData();
          const file = formData.get("file");
          const chapterParam = formData.get("chapter");
          const folderParam = formData.get("folder");

          if (!file || typeof file === "string") {
            return Response.json({ error: "No file provided in form" }, { status: 400 });
          }

          const fileObj = file as File;
          const arrayBuffer = await fileObj.arrayBuffer();
          const buffer = Buffer.from(arrayBuffer);

          // Max upload file size validation
          if (buffer.length > MAX_UPLOAD_FILE_BYTES) {
            return Response.json(
              {
                error: `File size exceeds limit of ${MAX_UPLOAD_FILE_BYTES / (1024 * 1024)}MB`,
              },
              { status: 413 },
            );
          }

          // Strict extension & MIME validation
          const validation = validateMediaUpload(fileObj.name, fileObj.type);
          if (!validation.valid) {
            return Response.json(
              { error: validation.reason || "File validation failed" },
              { status: 400 },
            );
          }

          // Confine upload directory strictly to public/uploads
          const uploadsRoot = path.resolve(process.cwd(), "public", "uploads");

          let subDir = "uploads";
          if (chapterParam && typeof chapterParam === "string") {
            const safeChapter = chapterParam.toLowerCase().replace(/[^a-z0-9_-]/g, "");
            subDir = path.join("uploads", "diary", safeChapter);
          } else if (folderParam && typeof folderParam === "string") {
            const safeFolder = folderParam.toLowerCase().replace(/[^a-z0-9_-]/g, "");
            subDir = path.join("uploads", safeFolder);
          }

          const targetDir = path.resolve(process.cwd(), "public", subDir);
          if (!isPathInside(uploadsRoot, targetDir)) {
            return Response.json({ error: "Invalid upload directory target" }, { status: 403 });
          }

          if (!fs.existsSync(targetDir)) {
            fs.mkdirSync(targetDir, { recursive: true });
          }

          const ext = path.extname(fileObj.name).toLowerCase();
          const safeBaseName = path
            .basename(fileObj.name, ext)
            .replace(/[^a-zA-Z0-9_-]/g, "_")
            .slice(0, 60);
          const fileName = `${Date.now()}-${safeBaseName}${ext}`;

          const filePath = path.join(targetDir, fileName);
          if (!isPathInside(uploadsRoot, filePath)) {
            return Response.json({ error: "Target file path traversal detected" }, { status: 403 });
          }

          fs.writeFileSync(filePath, buffer);

          // Public web URL normalized with forward slashes
          const webPath = `/${path.join(subDir, fileName).replace(/\\/g, "/")}`;

          return Response.json({
            ok: true,
            url: webPath,
            fileName,
            size: buffer.length,
            type: fileObj.type,
          });
        } catch (err) {
          console.error("[diary-upload] Upload error:", err);
          return Response.json({ error: "Failed to upload file safely" }, { status: 500 });
        }
      },
    },
  },
});
