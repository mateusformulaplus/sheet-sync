// Server-only password helpers. Blocked from client bundles by *.server.ts naming.
import { getCookie, setCookie, deleteCookie } from "@tanstack/react-start/server";

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

/** Sets a secure HTTP-only session cookie after successful login. */
export function setSessionCookie() {
  setCookie(SESSION_COOKIE, "1", {
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

/** Returns true when the session cookie is present (server-side check). */
export function isSessionValid(): boolean {
  return getCookie(SESSION_COOKIE) === "1";
}
