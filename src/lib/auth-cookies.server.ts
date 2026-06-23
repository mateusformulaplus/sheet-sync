// Server-only password helpers. Blocked from client bundles by *.server.ts naming.
import { getCookie, setCookie, deleteCookie } from "@tanstack/react-start/server";
import { verifyJwt } from "./jwt.server";

const SESSION_COOKIE = "fplus_session";

export function appPassword() {
  return process.env.APP_ACCESS_PASSWORD || "caioefrancine";
}

export function verifyPassword(pw: string): boolean {
  try {
    return pw === appPassword();
  } catch {
    return false;
  }
}

/** Returns true when the session cookie is present and valid (server-side check). */
export function isSessionValid(): boolean {
  const token = getCookie(SESSION_COOKIE);
  if (!token) return false;
  const payload = verifyJwt(token);
  return payload !== null;
}

/** Checks session cookie OR provided token parameter (e.g. for cross-site iframe loads) */
export function assertAuth(token?: string) {
  // 1. Try checking the secure HTTP-only session cookie
  if (isSessionValid()) {
    return;
  }
  // 2. Try checking the passed token (fallback for iframe cross-site environments)
  if (token) {
    const payload = verifyJwt(token);
    if (payload) {
      return;
    }
  }
  throw new Error("Não autorizado");
}

/** Sets a secure HTTP-only session cookie after successful login. */
export function setSessionCookie(token: string) {
  setCookie(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  });
}

/** Removes the session cookie (logout). */
export function clearSessionCookie() {
  deleteCookie(SESSION_COOKIE, { path: "/" });
}

