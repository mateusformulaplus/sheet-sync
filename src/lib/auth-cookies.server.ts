// Server-only password helpers. Blocked from client bundles by *.server.ts naming.
import { getWebRequest, appendResponseHeader } from "@tanstack/react-start/server";

const SESSION_COOKIE = "fplus_session";

export function appPassword() {
  return process.env.APP_ACCESS_PASSWORD;
}

export function verifyPassword(pw: string): boolean {
  try {
    return pw === appPassword();
  } catch {
    return false;
  }
}

export function assertPassword(pw: string | undefined) {
  if (!pw || !verifyPassword(pw)) {
    throw new Error("Não autorizado");
  }
}

/** Reads a named cookie from the current server request. */
function getCookieFromRequest(name: string): string | undefined {
  try {
    const req = getWebRequest();
    const cookieHeader = req?.headers.get("cookie") ?? "";
    const cookies = Object.fromEntries(
      cookieHeader.split(";").map((c) => {
        const [k, ...v] = c.trim().split("=");
        return [k.trim(), decodeURIComponent(v.join("="))];
      }),
    );
    return cookies[name];
  } catch {
    return undefined;
  }
}

/** Sets a secure HTTP-only session cookie after successful login. */
export function setSessionCookie() {
  const maxAge = 60 * 60 * 24 * 7; // 7 days
  const isProduction = process.env.NODE_ENV === "production";
  const cookieValue = [
    `${SESSION_COOKIE}=1`,
    "HttpOnly",
    "Path=/",
    `Max-Age=${maxAge}`,
    "SameSite=Lax",
    ...(isProduction ? ["Secure"] : []),
  ].join("; ");
  appendResponseHeader("Set-Cookie", cookieValue);
}

/** Removes the session cookie (logout). */
export function clearSessionCookie() {
  const cookieValue = `${SESSION_COOKIE}=; HttpOnly; Path=/; Max-Age=0; SameSite=Lax`;
  appendResponseHeader("Set-Cookie", cookieValue);
}

/** Returns true when the session cookie is present (server-side check). */
export function isSessionValid(): boolean {
  return getCookieFromRequest(SESSION_COOKIE) === "1";
}
