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

export const addFormula = createServerFn({ method: "POST" })
  .inputValidator(
    (d: {
      categoria: string;
      protocolo: string;
      preco: number;
      ativos: string;
      observacao: string;
      password: string;
    }) => {
      if (!d || typeof d.protocolo !== "string" || typeof d.categoria !== "string") {
        throw new Error("Dados inválidos");
      }
      if (typeof d.password !== "string") throw new Error("Senha obrigatória");
      if (typeof d.preco !== "number" || d.preco < 0 || d.preco > 1_000_000) {
        throw new Error("Preço fora do intervalo");
      }
      return d;
    },
  )
  .handler(async ({ data }) => {
    const { assertPassword } = await import("./auth-cookies.server");
    const { addFormulaRow } = await import("./sheets.server");
    assertPassword(data.password);
    await addFormulaRow({
      categoria: data.categoria,
      protocolo: data.protocolo,
      preco: data.preco,
      ativos: data.ativos,
      observacao: data.observacao,
    });
    return { ok: true };
  });

export const renameCategory = createServerFn({ method: "POST" })
  .inputValidator(
    (d: { oldName: string; newName: string; password: string }) => {
      if (!d || typeof d.oldName !== "string" || typeof d.newName !== "string") {
        throw new Error("Dados inválidos");
      }
      if (typeof d.password !== "string") throw new Error("Senha obrigatória");
      if (!d.oldName.trim() || !d.newName.trim()) throw new Error("Nomes inválidos");
      return d;
    },
  )
  .handler(async ({ data }) => {
    const { assertPassword } = await import("./auth-cookies.server");
    const { renameCategoryRows } = await import("./sheets.server");
    assertPassword(data.password);
    const count = await renameCategoryRows(data.oldName, data.newName);
    return { ok: true, count };
  });

export const deleteFormula = createServerFn({ method: "POST" })
  .validator((d: { rowIndex: number; password: string }) => {
    if (!d || typeof d.rowIndex !== "number") throw new Error("Dados inválidos");
    if (typeof d.password !== "string") throw new Error("Senha obrigatória");
    return d;
  })
  .handler(async ({ data }) => {
    const { assertPassword } = await import("./auth-cookies.server");
    const { deleteFormulaRow } = await import("./sheets.server");
    assertPassword(data.password);
    await deleteFormulaRow(data.rowIndex);
    return { ok: true };
  });
