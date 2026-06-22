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
