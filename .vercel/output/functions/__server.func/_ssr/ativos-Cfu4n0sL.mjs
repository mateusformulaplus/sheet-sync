import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { l as Package } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ativos-Cfu4n0sL.js
var import_jsx_runtime = require_jsx_runtime();
var SplitErrorComponent = ({ error }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: "min-h-screen flex items-center justify-center p-6 text-center brand-gradient-soft",
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "animate-fade-in-up",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "h-14 w-14 mx-auto rounded-2xl bg-destructive/10 flex items-center justify-center mb-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Package, { className: "h-6 w-6 text-destructive" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-destructive font-semibold text-lg",
				children: "Erro ao carregar"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground mt-2 max-w-xs",
				children: error.message
			})
		]
	})
});
//#endregion
export { SplitErrorComponent as errorComponent };
