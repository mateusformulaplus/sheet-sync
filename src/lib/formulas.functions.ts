import { createServerFn } from "@tanstack/react-start";

export const listFormulas = createServerFn({ method: "GET" }).handler(async () => {
  const { fetchFormulas, SPREADSHEET_URL } = await import("./sheets.server");
  const items = await fetchFormulas();
  return { items, sheetUrl: SPREADSHEET_URL };
});

export const setPrice = createServerFn({ method: "POST" })
  .inputValidator((d: { rowIndex: number; preco: number; password: string }) => {
    if (!d || typeof d.rowIndex !== "number" || typeof d.preco !== "number") {
      throw new Error("Dados inválidos");
    }
    if (typeof d.password !== "string") throw new Error("Senha obrigatória");
    if (d.preco < 0 || d.preco > 1_000_000) throw new Error("Preço fora do intervalo");
    return d;
  })
  .handler(async ({ data }) => {
    const { assertPassword } = await import("./auth-cookies.server");
    const { updatePrice } = await import("./sheets.server");
    assertPassword(data.password);
    await updatePrice(data.rowIndex, data.preco);
    return { ok: true };
  });
