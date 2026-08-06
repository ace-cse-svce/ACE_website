const CDN_BASE = (import.meta.env.VITE_ASSETS_BASE_URL as string | undefined)?.replace(/\/$/, "");

/**
 * Resolves a root-relative public asset path (e.g. "/mithun.webp") to the CDN
 * URL when VITE_ASSETS_BASE_URL is configured, otherwise falls back to the
 * local /public copy so the app still works without any CDN set up.
 */
export function assetUrl(path: string): string {
  if (!CDN_BASE || !path.startsWith("/")) return encodeURI(path);
  return `${CDN_BASE}${encodeURI(path)}`;
}
