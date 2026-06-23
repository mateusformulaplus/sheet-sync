import { k as redirect } from "../_libs/@tanstack/react-router+[...].mjs";
import { l as createServerFn } from "./esm-Dova13aH.mjs";
import { t as createServerRpc } from "./createServerRpc-WJgk8O8C.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-DAkOZwkD.js
var login_createServerFn_handler = createServerRpc({
	id: "3413f37ce562bd409c6edcfc5ac799a802e8aca98c19a8dbb241f2af801e245b",
	name: "login",
	filename: "src/lib/auth.ts"
}, (opts) => login.__executeServer(opts));
var login = createServerFn({ method: "POST" }).inputValidator((d) => {
	if (!d || typeof d.password !== "string") throw new Error("Senha obrigatória");
	if (d.password.length > 200) throw new Error("Senha inválida");
	return { password: d.password };
}).handler(login_createServerFn_handler, async ({ data }) => {
	const { verifyPassword, setSessionCookie } = await import("./auth-cookies.server-ONrsHARe.mjs");
	const { signJwt } = await import("./jwt.server-CSCqVZW_.mjs");
	if (!verifyPassword(data.password)) return {
		ok: false,
		error: "Senha incorreta"
	};
	const token = signJwt({ sub: "admin" });
	setSessionCookie(token);
	return {
		ok: true,
		token
	};
});
var logout_createServerFn_handler = createServerRpc({
	id: "d5bb0e8501dbd0d7db8b50ace95a44aa3933978585c00afbcf3414fddbdd4061",
	name: "logout",
	filename: "src/lib/auth.ts"
}, (opts) => logout.__executeServer(opts));
var logout = createServerFn({ method: "POST" }).handler(logout_createServerFn_handler, async () => {
	const { clearSessionCookie } = await import("./auth-cookies.server-ONrsHARe.mjs");
	clearSessionCookie();
});
var requireAuth_createServerFn_handler = createServerRpc({
	id: "986094df4ea3de9bd5613284524573c45fe4c9a3d9994e41dd157d53c8e035a1",
	name: "requireAuth",
	filename: "src/lib/auth.ts"
}, (opts) => requireAuth.__executeServer(opts));
var requireAuth = createServerFn({ method: "GET" }).handler(requireAuth_createServerFn_handler, async () => {
	const { isSessionValid } = await import("./auth-cookies.server-ONrsHARe.mjs");
	if (!isSessionValid()) throw redirect({ to: "/" });
});
//#endregion
export { login_createServerFn_handler, logout_createServerFn_handler, requireAuth_createServerFn_handler };
