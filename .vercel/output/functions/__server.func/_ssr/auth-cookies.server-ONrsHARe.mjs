import { a as setCookie$1, n as getCookie, t as deleteCookie$1 } from "./request-response-DKbRKVw6.mjs";
import { verifyJwt } from "./jwt.server-CSCqVZW_.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-cookies.server-ONrsHARe.js
var SESSION_COOKIE = "fplus_session";
function appPassword() {
	return process.env.APP_ACCESS_PASSWORD || "caioefrancine";
}
function verifyPassword(pw) {
	try {
		return pw === appPassword();
	} catch {
		return false;
	}
}
/** Returns true when the session cookie is present and valid (server-side check). */
function isSessionValid() {
	const token = getCookie(SESSION_COOKIE);
	if (!token) return false;
	return verifyJwt(token) !== null;
}
/** Checks session cookie OR provided token parameter (e.g. for cross-site iframe loads) */
function assertAuth(token) {
	if (isSessionValid()) return;
	if (token) {
		if (verifyJwt(token)) return;
	}
	throw new Error("Não autorizado");
}
/** Sets a secure HTTP-only session cookie after successful login. */
function setSessionCookie(token) {
	setCookie$1(SESSION_COOKIE, token, {
		httpOnly: true,
		secure: true,
		sameSite: "lax",
		maxAge: 3600 * 24 * 7,
		path: "/"
	});
}
/** Removes the session cookie (logout). */
function clearSessionCookie() {
	deleteCookie$1(SESSION_COOKIE, { path: "/" });
}
//#endregion
export { assertAuth, clearSessionCookie, isSessionValid, setSessionCookie, verifyPassword };
