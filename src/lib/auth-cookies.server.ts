// Server-only password helpers. Blocked from client bundles by *.server.ts naming.

export function appPassword() {
  const p = process.env.APP_ACCESS_PASSWORD;
  return p;
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
