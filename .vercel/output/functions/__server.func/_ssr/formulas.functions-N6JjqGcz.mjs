import { l as createServerFn } from "./esm-Dova13aH.mjs";
import { t as createServerRpc } from "./createServerRpc-WJgk8O8C.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/formulas.functions-N6JjqGcz.js
var listFormulas_createServerFn_handler = createServerRpc({
	id: "e597db70b3b55b72f362907825156b04d934b7db64bade1c0660a169015446ed",
	name: "listFormulas",
	filename: "src/lib/formulas.functions.ts"
}, (opts) => listFormulas.__executeServer(opts));
var listFormulas = createServerFn({ method: "GET" }).handler(listFormulas_createServerFn_handler, async () => {
	const { fetchFormulas, SPREADSHEET_URL } = await import("./sheets.server-BAIrcMcb.mjs");
	return {
		items: await fetchFormulas(),
		sheetUrl: SPREADSHEET_URL
	};
});
var setPrice_createServerFn_handler = createServerRpc({
	id: "0edabfb569494433799c215b4596fb8a8d76b5a69500bec109aa01fc54d25853",
	name: "setPrice",
	filename: "src/lib/formulas.functions.ts"
}, (opts) => setPrice.__executeServer(opts));
var setPrice = createServerFn({ method: "POST" }).inputValidator((d) => {
	if (!d || typeof d.rowIndex !== "number" || typeof d.preco !== "number") throw new Error("Dados inválidos");
	if (d.token !== void 0 && typeof d.token !== "string") throw new Error("Token inválido");
	if (d.preco < 0 || d.preco > 1e6) throw new Error("Preço fora do intervalo");
	return d;
}).handler(setPrice_createServerFn_handler, async ({ data }) => {
	const { assertAuth } = await import("./auth-cookies.server-ONrsHARe.mjs");
	const { updatePrice } = await import("./sheets.server-BAIrcMcb.mjs");
	assertAuth(data.token);
	await updatePrice(data.rowIndex, data.preco);
	return { ok: true };
});
var addFormula_createServerFn_handler = createServerRpc({
	id: "553f28ac812ceea06f5123477c5dde56965849dd830acc0c7886f83d18f87748",
	name: "addFormula",
	filename: "src/lib/formulas.functions.ts"
}, (opts) => addFormula.__executeServer(opts));
var addFormula = createServerFn({ method: "POST" }).inputValidator((d) => {
	if (!d || typeof d.protocolo !== "string" || typeof d.categoria !== "string") throw new Error("Dados inválidos");
	if (d.token !== void 0 && typeof d.token !== "string") throw new Error("Token inválido");
	if (typeof d.preco !== "number" || d.preco < 0 || d.preco > 1e6) throw new Error("Preço fora do intervalo");
	return d;
}).handler(addFormula_createServerFn_handler, async ({ data }) => {
	const { assertAuth } = await import("./auth-cookies.server-ONrsHARe.mjs");
	const { addFormulaRow } = await import("./sheets.server-BAIrcMcb.mjs");
	assertAuth(data.token);
	await addFormulaRow({
		categoria: data.categoria,
		protocolo: data.protocolo,
		preco: data.preco,
		ativos: data.ativos,
		observacao: data.observacao
	});
	return { ok: true };
});
var renameCategory_createServerFn_handler = createServerRpc({
	id: "f23c2bc749835e674ab9b201095eff376fcea76ffe77b6c3742bbfb5c9bfcec5",
	name: "renameCategory",
	filename: "src/lib/formulas.functions.ts"
}, (opts) => renameCategory.__executeServer(opts));
var renameCategory = createServerFn({ method: "POST" }).inputValidator((d) => {
	if (!d || typeof d.oldName !== "string" || typeof d.newName !== "string") throw new Error("Dados inválidos");
	if (d.token !== void 0 && typeof d.token !== "string") throw new Error("Token inválido");
	if (!d.oldName.trim() || !d.newName.trim()) throw new Error("Nomes inválidos");
	return d;
}).handler(renameCategory_createServerFn_handler, async ({ data }) => {
	const { assertAuth } = await import("./auth-cookies.server-ONrsHARe.mjs");
	const { renameCategoryRows } = await import("./sheets.server-BAIrcMcb.mjs");
	assertAuth(data.token);
	return {
		ok: true,
		count: await renameCategoryRows(data.oldName, data.newName)
	};
});
var deleteFormula_createServerFn_handler = createServerRpc({
	id: "6d2cc2f9270a67c86391c6978f2990dda7dabb07add04fe53e6609acc1acd7c1",
	name: "deleteFormula",
	filename: "src/lib/formulas.functions.ts"
}, (opts) => deleteFormula.__executeServer(opts));
var deleteFormula = createServerFn({ method: "POST" }).validator((d) => {
	if (!d || typeof d.rowIndex !== "number") throw new Error("Dados inválidos");
	if (d.token !== void 0 && typeof d.token !== "string") throw new Error("Token inválido");
	return d;
}).handler(deleteFormula_createServerFn_handler, async ({ data }) => {
	const { assertAuth } = await import("./auth-cookies.server-ONrsHARe.mjs");
	const { deleteFormulaRow } = await import("./sheets.server-BAIrcMcb.mjs");
	assertAuth(data.token);
	await deleteFormulaRow(data.rowIndex);
	return { ok: true };
});
//#endregion
export { addFormula_createServerFn_handler, deleteFormula_createServerFn_handler, listFormulas_createServerFn_handler, renameCategory_createServerFn_handler, setPrice_createServerFn_handler };
