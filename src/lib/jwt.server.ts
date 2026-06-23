import crypto from "crypto";

const JWT_SECRET =
  process.env.JWT_SECRET ||
  process.env.APP_ACCESS_PASSWORD ||
  "caioefrancine-fallback-jwt-secret-key-123456";

/** Helper to encode a Buffer to base64url */
function base64url(buf: Buffer): string {
  return buf
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

/** Helper to decode base64url string to Buffer */
function base64urlDecode(str: string): Buffer {
  let base64 = str.replace(/-/g, "+").replace(/_/g, "/");
  while (base64.length % 4) {
    base64 += "=";
  }
  return Buffer.from(base64, "base64");
}

/** Signs a payload with HMAC-SHA256 and returns a JWT token */
export function signJwt(payload: any, expiresInSeconds: number = 60 * 60 * 24 * 7): string {
  const header = { alg: "HS256", typ: "JWT" };
  const exp = Math.floor(Date.now() / 1000) + expiresInSeconds;
  const fullPayload = { ...payload, exp };

  const encodedHeader = base64url(Buffer.from(JSON.stringify(header)));
  const encodedPayload = base64url(Buffer.from(JSON.stringify(fullPayload)));

  const signature = crypto
    .createHmac("sha256", JWT_SECRET)
    .update(`${encodedHeader}.${encodedPayload}`)
    .digest();

  return `${encodedHeader}.${encodedPayload}.${base64url(signature)}`;
}

/** Verifies a JWT token signature and expiration, returning the payload if valid */
export function verifyJwt(token: string): any | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;

    const [headerB64, payloadB64, signatureB64] = parts;

    // Recalculate signature
    const expectedSignature = crypto
      .createHmac("sha256", JWT_SECRET)
      .update(`${headerB64}.${payloadB64}`)
      .digest();

    const expectedSignatureB64 = base64url(expectedSignature);

    const sigBuf = Buffer.from(signatureB64);
    const expectedBuf = Buffer.from(expectedSignatureB64);

    if (sigBuf.length !== expectedBuf.length) {
      return null;
    }

    // Prevent timing attacks
    if (!crypto.timingSafeEqual(sigBuf, expectedBuf)) {
      return null;
    }

    const payload = JSON.parse(base64urlDecode(payloadB64).toString("utf-8"));

    // Check expiration
    if (typeof payload.exp === "number" && Date.now() / 1000 > payload.exp) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}
