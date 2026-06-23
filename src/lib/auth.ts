// Client-safe auth. Uses localStorage for session (works in cross-site iframe).
// Server validates the JWT token on each protected mutation.
import { createServerFn } from "@tanstack/react-start";
import { redirect } from "@tanstack/react-router";

export const STORAGE_KEY = "fplus_token";

export const login = createServerFn({ method: "POST" })
  .inputValidator((d: { password: string }) => {
    if (!d || typeof d.password !== "string") throw new Error("Senha obrigatória");
    if (d.password.length > 200) throw new Error("Senha inválida");
    return { password: d.password };
  })
  .handler(async ({ data }) => {
    const { verifyPassword, setSessionCookie } = await import("./auth-cookies.server");
    const { signJwt } = await import("./jwt.server");

    if (!verifyPassword(data.password)) {
      return { ok: false as const, error: "Senha incorreta" };
    }

    // Generate JWT token for this session
    const token = signJwt({ sub: "admin" });
    setSessionCookie(token);

    return { ok: true as const, token };
  });

export const logout = createServerFn({ method: "POST" }).handler(async () => {
  const { clearSessionCookie } = await import("./auth-cookies.server");
  clearSessionCookie();
});

/**
 * Server-side session guard. Call inside `beforeLoad` of protected routes.
 * If no valid session cookie is found, throws a redirect to "/".
 */
export const requireAuth = createServerFn({ method: "GET" }).handler(async () => {
  const { isSessionValid } = await import("./auth-cookies.server");
  if (!isSessionValid()) {
    throw redirect({ to: "/" });
  }
});

export function clientIsAuthenticated(): boolean {
  if (typeof window === "undefined") return false;
  return !!window.localStorage.getItem(STORAGE_KEY);
}

export function clientGetToken(): string {
  if (typeof window === "undefined") return "";
  return window.localStorage.getItem(STORAGE_KEY) ?? "";
}

export function clientSetToken(token: string) {
  window.localStorage.setItem(STORAGE_KEY, token);
}

export function clientClearToken() {
  window.localStorage.removeItem(STORAGE_KEY);
}

