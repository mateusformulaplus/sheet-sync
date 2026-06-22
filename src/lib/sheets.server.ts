// Server-only helpers for the Google Sheets API (direct connection).
// Uses a Google Service Account — no Lovable gateway dependency.
// Do not import this file from client code.

import { google } from "googleapis";

const SHEET_ID = "13eNkou7xuY-79jhNF4zXtseSjoqKZE7kGz4jwMPV0Po";
const TAB = "Ativos";

export const SPREADSHEET_ID = SHEET_ID;
export const SPREADSHEET_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/edit`;

/**
 * Creates an authenticated Google Sheets client using Service Account credentials
 * from environment variables.
 */
function getSheetsClient() {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const rawKey = process.env.GOOGLE_PRIVATE_KEY;

  if (!email || !rawKey) {
    throw new Error(
      "Missing Google Service Account credentials. " +
        "Set GOOGLE_SERVICE_ACCOUNT_EMAIL and GOOGLE_PRIVATE_KEY in your .env file."
    );
  }

  // The private key comes from .env with literal "\n" — convert to real newlines
  const privateKey = rawKey.replace(/\\n/g, "\n");

  const auth = new google.auth.JWT({
    email,
    key: privateKey,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  return google.sheets({ version: "v4", auth });
}

export type Formula = {
  rowIndex: number; // 1-based row in the sheet (header is row 1)
  id: string;
  categoria: string;
  protocolo: string;
  preco: number;
  ativos: string;
  observacao: string;
};

export async function fetchFormulas(): Promise<Formula[]> {
  const sheets = getSheetsClient();

  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SHEET_ID,
    range: `${TAB}!A1:F1000`,
    valueRenderOption: "UNFORMATTED_VALUE",
  });

  const values = res.data.values ?? [];
  const rows = values.slice(1); // skip header row

  return rows
    .map((r, i) => ({
      rowIndex: i + 2,
      id: String(r[0] ?? ""),
      categoria: String(r[1] ?? ""),
      protocolo: String(r[2] ?? ""),
      preco: Number(r[3] ?? 0) || 0,
      ativos: String(r[4] ?? ""),
      observacao: String(r[5] ?? ""),
    }))
    .filter((f) => f.id);
}

export async function updatePrice(rowIndex: number, newPrice: number): Promise<void> {
  if (!Number.isFinite(newPrice) || newPrice < 0) throw new Error("Preço inválido");
  if (!Number.isInteger(rowIndex) || rowIndex < 2) throw new Error("Linha inválida");

  const sheets = getSheetsClient();
  const range = `${TAB}!D${rowIndex}`;

  await sheets.spreadsheets.values.update({
    spreadsheetId: SHEET_ID,
    range,
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [[newPrice]],
    },
  });
}

/** Generate next sequential ID based on existing rows */
function nextId(existingFormulas: Formula[]): string {
  let maxNum = 0;
  for (const f of existingFormulas) {
    const n = parseInt(f.id, 10);
    if (!isNaN(n) && n > maxNum) maxNum = n;
  }
  return String(maxNum + 1);
}

/** Append a new formula row to the spreadsheet */
export async function addFormulaRow(fields: {
  categoria: string;
  protocolo: string;
  preco: number;
  ativos: string;
  observacao: string;
}): Promise<void> {
  if (!fields.protocolo.trim()) throw new Error("Título é obrigatório");
  if (!fields.categoria.trim()) throw new Error("Categoria é obrigatória");
  if (!Number.isFinite(fields.preco) || fields.preco < 0) throw new Error("Preço inválido");

  const existing = await fetchFormulas();
  const id = nextId(existing);

  const sheets = getSheetsClient();
  await sheets.spreadsheets.values.append({
    spreadsheetId: SHEET_ID,
    range: `${TAB}!A:F`,
    valueInputOption: "USER_ENTERED",
    insertDataOption: "INSERT_ROWS",
    requestBody: {
      values: [[
        id,
        fields.categoria.trim(),
        fields.protocolo.trim(),
        fields.preco,
        fields.ativos.trim(),
        fields.observacao.trim(),
      ]],
    },
  });
}

/** Rename a category across all rows that match */
export async function renameCategoryRows(
  oldName: string,
  newName: string,
): Promise<number> {
  if (!oldName.trim() || !newName.trim()) throw new Error("Nomes inválidos");
  if (oldName.trim() === newName.trim()) return 0;

  const formulas = await fetchFormulas();
  const matching = formulas.filter(
    (f) => f.categoria.toLowerCase() === oldName.trim().toLowerCase(),
  );

  if (matching.length === 0) throw new Error("Categoria não encontrada");

  const sheets = getSheetsClient();

  // Batch update all matching rows
  const data = matching.map((f) => ({
    range: `${TAB}!B${f.rowIndex}`,
    values: [[newName.trim()]],
  }));

  await sheets.spreadsheets.values.batchUpdate({
    spreadsheetId: SHEET_ID,
    requestBody: {
      valueInputOption: "USER_ENTERED",
      data,
    },
  });

  return matching.length;
}

/** Delete a specific formula row completely */
export async function deleteFormulaRow(rowIndex: number): Promise<void> {
  if (!Number.isInteger(rowIndex) || rowIndex < 2) throw new Error("Linha inválida");

  const sheets = getSheetsClient();
  
  // First, get the specific sheetId for the TAB
  const ss = await sheets.spreadsheets.get({ spreadsheetId: SHEET_ID });
  const sheet = ss.data.sheets?.find(s => s.properties?.title === TAB);
  const sheetId = sheet?.properties?.sheetId;

  if (sheetId === undefined) throw new Error("Aba não encontrada");

  // The sheets API uses 0-based indexing for deleteDimension
  // If rowIndex is 2 (row 2 in spreadsheet), startIndex is 1 and endIndex is 2
  await sheets.spreadsheets.batchUpdate({
    spreadsheetId: SHEET_ID,
    requestBody: {
      requests: [
        {
          deleteDimension: {
            range: {
              sheetId: sheetId,
              dimension: "ROWS",
              startIndex: rowIndex - 1,
              endIndex: rowIndex,
            },
          },
        },
      ],
    },
  });
}
