import { ConvexHttpClient } from "convex/browser";

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;

function getClient(): ConvexHttpClient {
  if (!convexUrl) {
    throw new Error("Missing NEXT_PUBLIC_CONVEX_URL");
  }
  return new ConvexHttpClient(convexUrl);
}

// Lazy-init: don't throw at import time during build
let _client: ConvexHttpClient | null = null;

export const convex = new Proxy({} as ConvexHttpClient, {
  get(_, prop) {
    if (!_client) {
      _client = getClient();
    }
    return (_client as any)[prop];
  },
});
