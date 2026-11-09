import path from "node:path";

/**
 * Enterprise-grade Security Utilities for Palak Tripathi's Scrapbook Diary
 * - Zero Prototype Pollution
 * - Path Traversal Prevention
 * - File Whitelisting (Extensions & MIME)
 * - Safe Input Sanitization
 * - Strict Security Headers (CSP, HSTS, Permissions-Policy, etc.)
 */

export const MAX_STORE_PAYLOAD_BYTES = 2 * 1024 * 1024; // 2 MB
export const MAX_UPLOAD_FILE_BYTES = 50 * 1024 * 1024; // 50 MB

export const ALLOWED_UPLOAD_EXTENSIONS = new Set([
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".gif",
  ".mp4",
  ".webm",
  ".mp3",
  ".wav",
  ".m4a",
  ".aac",
  ".pdf",
]);

export const ALLOWED_MIME_PREFIXES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "video/mp4",
  "video/webm",
  "audio/mpeg",
  "audio/wav",
  "audio/mp3",
  "audio/x-m4a",
  "audio/aac",
  "application/pdf",
];

const FORBIDDEN_KEYS = new Set(["__proto__", "constructor", "prototype"]);

/**
 * Checks if an object contains any dangerous prototype pollution keys.
 */
export function containsPrototypePollution(data: unknown): boolean {
  if (data === null || typeof data !== "object") {
    return false;
  }

  if (Array.isArray(data)) {
    return data.some((item) => containsPrototypePollution(item));
  }

  for (const key of Object.keys(data as Record<string, unknown>)) {
    if (FORBIDDEN_KEYS.has(key)) {
      return true;
    }
    if (containsPrototypePollution((data as Record<string, unknown>)[key])) {
      return true;
    }
  }

  return false;
}

/**
 * Validates that a target path resolves safely inside the expected base directory,
 * preventing Directory Traversal (CWE-22).
 */
export function isPathInside(baseDir: string, targetPath: string): boolean {
  const resolvedBase = path.resolve(baseDir);
  const resolvedTarget = path.resolve(targetPath);
  return resolvedTarget.startsWith(resolvedBase + path.sep) || resolvedTarget === resolvedBase;
}

/**
 * Validates file upload extension and MIME type against strict whitelists.
 */
export function validateMediaUpload(
  fileName: string,
  mimeType: string,
): { valid: boolean; reason?: string } {
  const ext = (path.extname(fileName) || "").toLowerCase();
  if (!ALLOWED_UPLOAD_EXTENSIONS.has(ext)) {
    return {
      valid: false,
      reason: `Disallowed file extension '${ext}'. Permitted: ${Array.from(ALLOWED_UPLOAD_EXTENSIONS).join(", ")}`,
    };
  }

  const isMimeAllowed = ALLOWED_MIME_PREFIXES.some(
    (prefix) => mimeType === prefix || mimeType.startsWith(`${prefix};`),
  );
  if (!isMimeAllowed) {
    return {
      valid: false,
      reason: `Disallowed MIME type '${mimeType}'. Permitted types: image, video, audio, pdf.`,
    };
  }

  return { valid: true };
}

/**
 * Sanitizes input strings against stored XSS by neutralizing script tags.
 */
export function sanitizeString(val: string): string {
  if (typeof val !== "string") return "";
  return val
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/javascript:/gi, "")
    .replace(/on\w+=/gi, "");
}

/**
 * Standard HTTP Security Headers (OWASP Recommended)
 */
export const ENTERPRISE_SECURITY_HEADERS: Record<string, string> = {
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "X-XSS-Protection": "1; mode=block",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(self), geolocation=(), interest-cohort=()",
  "Content-Security-Policy":
    "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https:; style-src 'self' 'unsafe-inline' https:; img-src 'self' data: blob: https:; font-src 'self' data: https:; media-src 'self' blob: https:; connect-src 'self' https: wss: ws:; frame-ancestors 'none'; object-src 'none';",
};
