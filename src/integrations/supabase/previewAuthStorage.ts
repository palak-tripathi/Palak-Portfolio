/** Storage accepted by Supabase's `auth.storage` option; `localStorage` and the editor broker both satisfy it. */
export interface PreviewAuthStorage {
  getItem: (key: string) => string | null | Promise<string | null>;
  setItem: (key: string, value: string) => void | Promise<void>;
  removeItem: (key: string) => void | Promise<void>;
}

type BrokerRequestType =
  "app-preview-auth:get" | "app-preview-auth:set" | "app-preview-auth:remove";

interface BrokerRequest {
  type: BrokerRequestType;
  requestId: string;
  projectId: string;
  key: string;
  value?: string;
}

interface BrokerReply {
  ok: boolean;
  value: string | null;
}

const RESULT = "app-preview-auth:result";

function readBrokerReply(data: unknown, requestId: string): BrokerReply | null {
  if (typeof data !== "object" || data === null) return null;
  if (!("type" in data) || data.type !== RESULT) return null;
  if (!("requestId" in data) || data.requestId !== requestId) return null;
  return {
    ok: "ok" in data && Boolean(data.ok),
    value: "value" in data && typeof data.value === "string" ? data.value : null,
  };
}

/**
 * Standard preview and local auth session storage broker
 */
export function brokeredPreviewStorage(): PreviewAuthStorage | undefined {
  if (typeof window === "undefined") return undefined;
  return localStorage;
}
