export interface UrlAnalysis {
  valid: boolean;
  internal?: boolean;
  protocol?: string;
  hostname?: string;
  origin?: string;
}

const APP_URL = process.env.NEXT_PUBLIC_APP_URL;

if (!APP_URL) {
  throw new Error("NEXT_PUBLIC_APP_URL is required but not defined");
}

// Validate APP_URL itself
let APP_BASE: URL;
try {
  APP_BASE = new URL(APP_URL);
} catch {
  throw new Error("NEXT_PUBLIC_APP_URL is not a valid URL");
}

/**
 * Safely parses a URL using APP_URL as base.
 */
function parseUrl(url: string, base: string = APP_BASE.origin): URL | null {
  try {
    return new URL(url, base);
  } catch {
    return null;
  }
}

/**
 * Checks whether a URL is valid.
 */
function isValidUrl(url: string, base?: string): boolean {
  return parseUrl(url, base ?? APP_BASE.origin) !== null;
}

/**
 * Checks whether a URL is internal (same origin as APP_URL).
 */
function isInternalUrl(url: string, base?: string): boolean {
  const parsed = parseUrl(url, base ?? APP_BASE.origin);
  if (!parsed) return false;

  return parsed.origin === APP_BASE.origin;
}

/**
 * Checks whether URL uses HTTP or HTTPS.
 */
function isHttpUrl(url: string, base?: string): boolean {
  const parsed = parseUrl(url, base ?? APP_BASE.origin);
  if (!parsed) return false;

  return parsed.protocol === "http:" || parsed.protocol === "https:";
}

/**
 * Returns structured analysis of a URL.
 */
function analyzeUrl(url: string, base?: string): UrlAnalysis {
  const parsed = parseUrl(url, base ?? APP_BASE.origin);

  if (!parsed) {
    return { valid: false };
  }

  return {
    valid: true,
    internal: parsed.origin === APP_BASE.origin,
    protocol: parsed.protocol,
    hostname: parsed.hostname,
    origin: parsed.origin,
  };
}

export {
  APP_BASE,
  APP_URL,
  isHttpUrl,
  isValidUrl,
  parseUrl,
  analyzeUrl,
  isInternalUrl,
};
