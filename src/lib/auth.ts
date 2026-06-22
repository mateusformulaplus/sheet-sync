// Client-safe auth. Uses localStorage for session (works in cross-site iframe).
// Server validates the password on each protected mutation.
import { createServerFn } from "@tanstack/react-start";

export const STORAGE_KEY = "fplus_pw";

export const login = createServerFn({ method: "POST" })
  .inputValidator((d: { password: string }) => {
    if (!d || typeof d.password !== "string") throw new Error("Senha obrigatória");
    if (d.password.length > 200) throw new Error("Senha inválida");
    return { password: d.password };
  })
  .handler(async ({ data }) => {
    const { verifyPassword } = await import("./auth-cookies.server");
    if (!verifyPassword(data.password)) {
      return { ok: false as const, error: "Senha incorreta" };
    }
    return { ok: true as const };
  });

export function clientIsAuthenticated(): boolean {
  if (typeof window === "undefined") return false;
  return !!window.localStorage.getItem(STORAGE_KEY);
}

export function clientGetPassword(): string {
  if (typeof window === "undefined") return "";
  return window.localStorage.getItem(STORAGE_KEY) ?? "";
}

export function clientSetPassword(pw: string) {
  window.localStorage.setItem(STORAGE_KEY, pw);
}

export function clientClearPassword() {
  window.localStorage.removeItem(STORAGE_KEY);
}
