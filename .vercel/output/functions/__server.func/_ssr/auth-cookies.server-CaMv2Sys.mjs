import { a as setCookie$1, n as getCookie, t as deleteCookie$1 } from "./request-response-DKbRKVw6.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-cookies.server-CaMv2Sys.js
var SESSION_COOKIE = "fplus_session";
function appPassword() {
	return process.env.APP_ACCESS_PASSWORD;
}
function verifyPassword(pw) {
	try {
		return pw === appPassword();
	} catch {
		return false;
	}
}
function assertPassword(pw) {
	if (!pw || !verifyPassword(pw)) throw new Error("Não autorizado");
}
/** Sets a secure HTTP-only session cookie after successful login. */
function setSessionCookie() {
	setCookie$1(SESSION_COOKIE, "1", {
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
/** Returns true when the session cookie is present (server-side check). */
function isSessionValid() {
	return getCookie(SESSION_COOKIE) === "1";
}
//#endregion
export { assertPassword, clearSessionCookie, isSessionValid, setSessionCookie, verifyPassword };
