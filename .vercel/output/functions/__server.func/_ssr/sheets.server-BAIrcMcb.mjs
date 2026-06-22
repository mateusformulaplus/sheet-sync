import { t as require_src } from "../_libs/googleapis+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/sheets.server-BAIrcMcb.js
var import_src = require_src();
var SHEET_ID = "13eNkou7xuY-79jhNF4zXtseSjoqKZE7kGz4jwMPV0Po";
var TAB = "Ativos";
var SPREADSHEET_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/edit`;
/**
* Creates an authenticated Google Sheets client using Service Account credentials
* from environment variables.
*/
function getSheetsClient() {
	const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
	const rawKey = process.env.GOOGLE_PRIVATE_KEY;
	if (!email || !rawKey) throw new Error("Missing Google Service Account credentials. Set GOOGLE_SERVICE_ACCOUNT_EMAIL and GOOGLE_PRIVATE_KEY in your .env file.");
	const privateKey = rawKey.replace(/\\n/g, "\n");
	const auth = new import_src.google.auth.JWT({
		email,
		key: privateKey,
		scopes: ["https://www.googleapis.com/auth/spreadsheets"]
	});
	return import_src.google.sheets({
		version: "v4",
		auth
	});
}
async function fetchFormulas() {
	return ((await getSheetsClient().spreadsheets.values.get({
		spreadsheetId: SHEET_ID,
		range: `${TAB}!A1:F1000`,
		valueRenderOption: "UNFORMATTED_VALUE"
	})).data.values ?? []).slice(1).map((r, i) => ({
		rowIndex: i + 2,
		id: String(r[0] ?? ""),
		categoria: String(r[1] ?? ""),
		protocolo: String(r[2] ?? ""),
		preco: Number(r[3] ?? 0) || 0,
		ativos: String(r[4] ?? ""),
		observacao: String(r[5] ?? "")
	})).filter((f) => f.id);
}
async function updatePrice(rowIndex, newPrice) {
	if (!Number.isFinite(newPrice) || newPrice < 0) throw new Error("Preço inválido");
	if (!Number.isInteger(rowIndex) || rowIndex < 2) throw new Error("Linha inválida");
	const sheets = getSheetsClient();
	const range = `${TAB}!D${rowIndex}`;
	await sheets.spreadsheets.values.update({
		spreadsheetId: SHEET_ID,
		range,
		valueInputOption: "USER_ENTERED",
		requestBody: { values: [[newPrice]] }
	});
}
/** Generate next sequential ID based on existing rows */
function nextId(existingFormulas) {
	let maxNum = 0;
	for (const f of existingFormulas) {
		const n = parseInt(f.id, 10);
		if (!isNaN(n) && n > maxNum) maxNum = n;
	}
	return String(maxNum + 1);
}
/** Append a new formula row to the spreadsheet */
async function addFormulaRow(fields) {
	if (!fields.protocolo.trim()) throw new Error("Título é obrigatório");
	if (!fields.categoria.trim()) throw new Error("Categoria é obrigatória");
	if (!Number.isFinite(fields.preco) || fields.preco < 0) throw new Error("Preço inválido");
	const id = nextId(await fetchFormulas());
	await getSheetsClient().spreadsheets.values.append({
		spreadsheetId: SHEET_ID,
		range: `${TAB}!A:F`,
		valueInputOption: "USER_ENTERED",
		insertDataOption: "INSERT_ROWS",
		requestBody: { values: [[
			id,
			fields.categoria.trim(),
			fields.protocolo.trim(),
			fields.preco,
			fields.ativos.trim(),
			fields.observacao.trim()
		]] }
	});
}
/** Rename a category across all rows that match */
async function renameCategoryRows(oldName, newName) {
	if (!oldName.trim() || !newName.trim()) throw new Error("Nomes inválidos");
	if (oldName.trim() === newName.trim()) return 0;
	const matching = (await fetchFormulas()).filter((f) => f.categoria.toLowerCase() === oldName.trim().toLowerCase());
	if (matching.length === 0) throw new Error("Categoria não encontrada");
	const sheets = getSheetsClient();
	const data = matching.map((f) => ({
		range: `${TAB}!B${f.rowIndex}`,
		values: [[newName.trim()]]
	}));
	await sheets.spreadsheets.values.batchUpdate({
		spreadsheetId: SHEET_ID,
		requestBody: {
			valueInputOption: "USER_ENTERED",
			data
		}
	});
	return matching.length;
}
/** Delete a specific formula row completely */
async function deleteFormulaRow(rowIndex) {
	if (!Number.isInteger(rowIndex) || rowIndex < 2) throw new Error("Linha inválida");
	const sheets = getSheetsClient();
	const sheetId = ((await sheets.spreadsheets.get({ spreadsheetId: SHEET_ID })).data.sheets?.find((s) => s.properties?.title === TAB))?.properties?.sheetId;
	if (sheetId === void 0) throw new Error("Aba não encontrada");
	await sheets.spreadsheets.batchUpdate({
		spreadsheetId: SHEET_ID,
		requestBody: { requests: [{ deleteDimension: { range: {
			sheetId,
			dimension: "ROWS",
			startIndex: rowIndex - 1,
			endIndex: rowIndex
		} } }] }
	});
}
//#endregion
export { SPREADSHEET_URL, addFormulaRow, deleteFormulaRow, fetchFormulas, renameCategoryRows, updatePrice };
