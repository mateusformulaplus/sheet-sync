//#region node_modules/.nitro/vite/services/ssr/assets/__23tanstack-start-server-fn-resolver-WuDkeQMz.js
var manifest = {
	"0edabfb569494433799c215b4596fb8a8d76b5a69500bec109aa01fc54d25853": {
		functionName: "setPrice_createServerFn_handler",
		importer: () => import("./_ssr/formulas.functions-N6JjqGcz.mjs")
	},
	"3413f37ce562bd409c6edcfc5ac799a802e8aca98c19a8dbb241f2af801e245b": {
		functionName: "login_createServerFn_handler",
		importer: () => import("./_ssr/auth-DAkOZwkD.mjs")
	},
	"553f28ac812ceea06f5123477c5dde56965849dd830acc0c7886f83d18f87748": {
		functionName: "addFormula_createServerFn_handler",
		importer: () => import("./_ssr/formulas.functions-N6JjqGcz.mjs")
	},
	"6d2cc2f9270a67c86391c6978f2990dda7dabb07add04fe53e6609acc1acd7c1": {
		functionName: "deleteFormula_createServerFn_handler",
		importer: () => import("./_ssr/formulas.functions-N6JjqGcz.mjs")
	},
	"986094df4ea3de9bd5613284524573c45fe4c9a3d9994e41dd157d53c8e035a1": {
		functionName: "requireAuth_createServerFn_handler",
		importer: () => import("./_ssr/auth-DAkOZwkD.mjs")
	},
	"d5bb0e8501dbd0d7db8b50ace95a44aa3933978585c00afbcf3414fddbdd4061": {
		functionName: "logout_createServerFn_handler",
		importer: () => import("./_ssr/auth-DAkOZwkD.mjs")
	},
	"e597db70b3b55b72f362907825156b04d934b7db64bade1c0660a169015446ed": {
		functionName: "listFormulas_createServerFn_handler",
		importer: () => import("./_ssr/formulas.functions-N6JjqGcz.mjs")
	},
	"f23c2bc749835e674ab9b201095eff376fcea76ffe77b6c3742bbfb5c9bfcec5": {
		functionName: "renameCategory_createServerFn_handler",
		importer: () => import("./_ssr/formulas.functions-N6JjqGcz.mjs")
	}
};
async function getServerFnById(id, access) {
	const serverFnInfo = manifest[id];
	if (!serverFnInfo) throw new Error("Server function info not found for " + id);
	const fnModule = serverFnInfo.module ?? await serverFnInfo.importer();
	if (!fnModule) throw new Error("Server function module not resolved for " + id);
	const action = fnModule[serverFnInfo.functionName];
	if (!action) throw new Error("Server function module export not resolved for serverFn ID: " + id);
	return action;
}
//#endregion
export { getServerFnById as t };
