import { o as __toESM } from "../_runtime.mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { d as Lock, i as ShieldCheck, y as ArrowRight } from "../_libs/lucide-react.mjs";
import { g as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as Logo, n as Input, o as useServerFn, r as Label, t as Button } from "./label-BEIxUHTW.mjs";
import { i as clientSetToken, o as login } from "./auth-C8iYyVIi.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-0XGw2S4q.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function LoginPage() {
	const router = useRouter();
	const loginFn = useServerFn(login);
	const [password, setPassword] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	async function onSubmit(e) {
		e.preventDefault();
		setLoading(true);
		setError(null);
		try {
			const res = await loginFn({ data: { password } });
			if (!res.ok) setError(res.error ?? "Senha incorreta");
			else {
				if (res.token) clientSetToken(res.token);
				await router.navigate({ to: "/ativos" });
			}
		} catch (err) {
			setError(err instanceof Error ? err.message : "Erro ao entrar");
		} finally {
			setLoading(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "brand-gradient-soft min-h-screen flex items-center justify-center px-4 py-10 sm:py-16",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "pointer-events-none fixed inset-0 overflow-hidden",
			"aria-hidden": "true",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -top-32 -left-32 h-96 w-96 rounded-full bg-primary/[0.06] blur-3xl" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -bottom-40 -right-40 h-[28rem] w-[28rem] rounded-full bg-leaf/[0.06] blur-3xl" })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative w-full max-w-[26rem] animate-fade-in-up",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "glass card-shadow rounded-3xl px-7 sm:px-10 py-10 sm:py-12 border border-white/60",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col items-center text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -inset-3 rounded-full bg-primary/[0.07] blur-xl" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, { className: "relative h-20 w-auto sm:h-24 drop-shadow-sm" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "mt-7 text-[1.65rem] sm:text-3xl font-extrabold tracking-tight text-foreground leading-tight",
								children: "Portal de Fórmulas"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-muted-foreground max-w-[18rem] leading-relaxed",
								children: "Acesso restrito à equipe autorizada"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mt-8 mb-7 h-px bg-gradient-to-r from-transparent via-border to-transparent" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit,
						className: "space-y-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
									htmlFor: "password",
									className: "text-sm font-medium text-foreground/80 flex items-center gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "h-3.5 w-3.5 text-muted-foreground" }), "Senha de acesso"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "password",
									type: "password",
									autoComplete: "current-password",
									placeholder: "••••••••",
									value: password,
									onChange: (e) => setPassword(e.target.value),
									required: true,
									autoFocus: true,
									className: "h-12 bg-white/50 border-border/70 rounded-xl text-base placeholder:text-muted-foreground/50 transition-all duration-200 focus:bg-white focus:border-ring focus:ring-2 focus:ring-ring/20"
								})]
							}),
							error && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 rounded-xl bg-destructive/8 border border-destructive/15 px-3.5 py-2.5 animate-fade-in",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-1.5 w-1.5 rounded-full bg-destructive shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-destructive font-medium",
									role: "alert",
									children: error
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "submit",
								className: "w-full h-12 brand-gradient text-primary-foreground hover:opacity-[0.92] font-semibold text-base rounded-xl shadow-lg shadow-primary/20 transition-all duration-200 active:scale-[0.98] cursor-pointer",
								disabled: loading || !password,
								children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" }), "Entrando…"]
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center gap-2",
									children: ["Entrar", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
								})
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 flex items-center justify-center gap-1.5 text-xs text-muted-foreground/70",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-3.5 w-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Conexão segura e criptografada" })]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-8 text-center text-xs text-muted-foreground/60 tracking-wide",
				children: [
					"© ",
					(/* @__PURE__ */ new Date()).getFullYear(),
					" Fórmula Plus — Farmácia de Manipulação"
				]
			})]
		})]
	});
}
//#endregion
export { LoginPage as component };
