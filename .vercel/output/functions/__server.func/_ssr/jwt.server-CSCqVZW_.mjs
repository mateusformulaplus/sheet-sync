import crypto from "crypto";
//#region node_modules/.nitro/vite/services/ssr/assets/jwt.server-CSCqVZW_.js
var JWT_SECRET = process.env.JWT_SECRET || process.env.APP_ACCESS_PASSWORD || "caioefrancine-fallback-jwt-secret-key-123456";
/** Helper to encode a Buffer to base64url */
function base64url(buf) {
	return buf.toString("base64").replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}
/** Helper to decode base64url string to Buffer */
function base64urlDecode(str) {
	let base64 = str.replace(/-/g, "+").replace(/_/g, "/");
	while (base64.length % 4) base64 += "=";
	return Buffer.from(base64, "base64");
}
/** Signs a payload with HMAC-SHA256 and returns a JWT token */
function signJwt(payload, expiresInSeconds = 3600 * 24 * 7) {
	const header = {
		alg: "HS256",
		typ: "JWT"
	};
	const exp = Math.floor(Date.now() / 1e3) + expiresInSeconds;
	const fullPayload = {
		...payload,
		exp
	};
	const encodedHeader = base64url(Buffer.from(JSON.stringify(header)));
	const encodedPayload = base64url(Buffer.from(JSON.stringify(fullPayload)));
	return `${encodedHeader}.${encodedPayload}.${base64url(crypto.createHmac("sha256", JWT_SECRET).update(`${encodedHeader}.${encodedPayload}`).digest())}`;
}
/** Verifies a JWT token signature and expiration, returning the payload if valid */
function verifyJwt(token) {
	try {
		const parts = token.split(".");
		if (parts.length !== 3) return null;
		const [headerB64, payloadB64, signatureB64] = parts;
		const expectedSignatureB64 = base64url(crypto.createHmac("sha256", JWT_SECRET).update(`${headerB64}.${payloadB64}`).digest());
		const sigBuf = Buffer.from(signatureB64);
		const expectedBuf = Buffer.from(expectedSignatureB64);
		if (sigBuf.length !== expectedBuf.length) return null;
		if (!crypto.timingSafeEqual(sigBuf, expectedBuf)) return null;
		const payload = JSON.parse(base64urlDecode(payloadB64).toString("utf-8"));
		if (typeof payload.exp === "number" && Date.now() / 1e3 > payload.exp) return null;
		return payload;
	} catch {
		return null;
	}
}
//#endregion
export { signJwt, verifyJwt };
