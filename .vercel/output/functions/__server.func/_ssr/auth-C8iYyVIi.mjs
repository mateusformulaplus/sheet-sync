import { i as TSS_SERVER_FUNCTION, l as createServerFn } from "./esm-Dova13aH.mjs";
import { t as getServerFnById } from "../__23tanstack-start-server-fn-resolver-WuDkeQMz.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-C8iYyVIi.js
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var STORAGE_KEY = "fplus_token";
var login = createServerFn({ method: "POST" }).inputValidator((d) => {
	if (!d || typeof d.password !== "string") throw new Error("Senha obrigatória");
	if (d.password.length > 200) throw new Error("Senha inválida");
	return { password: d.password };
}).handler(createSsrRpc("3413f37ce562bd409c6edcfc5ac799a802e8aca98c19a8dbb241f2af801e245b"));
var logout = createServerFn({ method: "POST" }).handler(createSsrRpc("d5bb0e8501dbd0d7db8b50ace95a44aa3933978585c00afbcf3414fddbdd4061"));
/**
* Server-side session guard. Call inside `beforeLoad` of protected routes.
* If no valid session cookie is found, throws a redirect to "/".
*/
var requireAuth = createServerFn({ method: "GET" }).handler(createSsrRpc("986094df4ea3de9bd5613284524573c45fe4c9a3d9994e41dd157d53c8e035a1"));
function clientIsAuthenticated() {
	if (typeof window === "undefined") return false;
	return !!window.localStorage.getItem(STORAGE_KEY);
}
function clientGetToken() {
	if (typeof window === "undefined") return "";
	return window.localStorage.getItem("fplus_token") ?? "";
}
function clientSetToken(token) {
	window.localStorage.setItem(STORAGE_KEY, token);
}
function clientClearToken() {
	window.localStorage.removeItem(STORAGE_KEY);
}
//#endregion
export { createSsrRpc as a, requireAuth as c, clientSetToken as i, clientGetToken as n, login as o, clientIsAuthenticated as r, logout as s, clientClearToken as t };
