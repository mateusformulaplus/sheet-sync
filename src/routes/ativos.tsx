import { createFileRoute, redirect, useRouter } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useMemo, useState, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Pencil,
  LogOut,
  ExternalLink,
  RefreshCw,
  Package,
  ChevronRight,
  Plus,
  FolderPen,
  Tag,
  ArrowDownToLine,
  Trash2,
  Copy,
  Check,
} from "lucide-react";
import { clientIsAuthenticated, clientGetPassword, clientClearPassword } from "@/lib/auth";
import { listFormulas, setPrice, addFormula, renameCategory, deleteFormula } from "@/lib/formulas.functions";

export const Route = createFileRoute("/ativos")({
  head: () => ({
    meta: [
      { title: "Fórmula Plus — Fórmulas e Preços" },
      { name: "description", content: "Gestão de fórmulas manipuladas e preços." },
      { name: "robots", content: "noindex" },
    ],
  }),
  beforeLoad: () => {
    if (typeof window !== "undefined" && !clientIsAuthenticated()) {
      throw redirect({ to: "/" });
    }
  },
  component: AtivosPage,
  errorComponent: ({ error }) => (
    <div className="min-h-screen flex items-center justify-center p-6 text-center brand-gradient-soft">
      <div className="animate-fade-in-up">
        <div className="h-14 w-14 mx-auto rounded-2xl bg-destructive/10 flex items-center justify-center mb-4">
          <Package className="h-6 w-6 text-destructive" />
        </div>
        <p className="text-destructive font-semibold text-lg">Erro ao carregar</p>
        <p className="text-sm text-muted-foreground mt-2 max-w-xs">{error.message}</p>
      </div>
    </div>
  ),
});

type Formula = {
  rowIndex: number;
  id: string;
  categoria: string;
  protocolo: string;
  preco: number;
  ativos: string;
  observacao: string;
};

const brl = (n: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(n);

/* ─── New Category Select value ─── */
const NEW_CATEGORY_VALUE = "__new__";

function AtivosPage() {
  const router = useRouter();
  const qc = useQueryClient();
  const listFn = useServerFn(listFormulas);
  const setPriceFn = useServerFn(setPrice);
  const addFormulaFn = useServerFn(addFormula);
  const renameCategoryFn = useServerFn(renameCategory);
  const deleteFormulaFn = useServerFn(deleteFormula);

  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: ["formulas"],
    queryFn: () => listFn(),
  });

  const [query, setQuery] = useState("");

  // ── Edit price dialog ──
  const [editing, setEditing] = useState<Formula | null>(null);
  const [draftPrice, setDraftPrice] = useState("");
  const [saveError, setSaveError] = useState<string | null>(null);

  // ── Add formula dialog ──
  const [showAdd, setShowAdd] = useState(false);
  const [addCategoryMode, setAddCategoryMode] = useState<"existing" | "new">("existing");
  const [addCategory, setAddCategory] = useState("");
  const [addNewCategory, setAddNewCategory] = useState("");
  const [addCategoryFixed, setAddCategoryFixed] = useState(false);
  const [addProtocolo, setAddProtocolo] = useState("");
  const [addPreco, setAddPreco] = useState("");
  const [addAtivos, setAddAtivos] = useState("");
  const [addObs, setAddObs] = useState("");
  const [addError, setAddError] = useState<string | null>(null);

  // ── Rename category dialog ──
  const [renamingCategory, setRenamingCategory] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState("");
  const [renameError, setRenameError] = useState<string | null>(null);

  // ── View Formula Dialog ──
  const [viewingFormula, setViewingFormula] = useState<Formula | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);

  const priceMutation = useMutation({
    mutationFn: (vars: { rowIndex: number; preco: number }) =>
      setPriceFn({ data: { ...vars, password: clientGetPassword() } }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["formulas"] });
      setEditing(null);
      setSaveError(null);
    },
    onError: (e: unknown) =>
      setSaveError(e instanceof Error ? e.message : "Erro ao salvar"),
  });

  const addMutation = useMutation({
    mutationFn: (vars: {
      categoria: string;
      protocolo: string;
      preco: number;
      ativos: string;
      observacao: string;
    }) => addFormulaFn({ data: { ...vars, password: clientGetPassword() } }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["formulas"] });
      resetAddForm();
    },
    onError: (e: unknown) =>
      setAddError(e instanceof Error ? e.message : "Erro ao adicionar"),
  });

  const renameMutation = useMutation({
    mutationFn: (vars: { oldName: string; newName: string }) =>
      renameCategoryFn({ data: { ...vars, password: clientGetPassword() } }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["formulas"] });
      setRenamingCategory(null);
      setRenameError(null);
    },
    onError: (e: unknown) =>
      setRenameError(e instanceof Error ? e.message : "Erro ao renomear"),
  });

  const deleteMutation = useMutation({
    mutationFn: (vars: { rowIndex: number }) =>
      deleteFormulaFn({ data: { ...vars, password: clientGetPassword() } }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["formulas"] });
      setEditing(null);
      setSaveError(null);
    },
    onError: (e: unknown) =>
      setSaveError(e instanceof Error ? e.message : "Erro ao excluir"),
  });

  // ── Bottom categories ──
  const [bottomCategories, setBottomCategories] = useState<string[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("fplus_bottom_categories");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed)) {
            if (!parsed.includes("Protocolos Combinados")) {
              parsed.push("Protocolos Combinados");
              localStorage.setItem("fplus_bottom_categories", JSON.stringify(parsed));
            }
            return parsed;
          }
        } catch {}
      }
    }
    return ["Protocolos Combinados"];
  });

  const existingCategories = useMemo(() => {
    const items = (data?.items ?? []) as Formula[];
    const set = new Set<string>();
    for (const f of items) {
      if (f.categoria) set.add(f.categoria);
    }
    return Array.from(set).sort();
  }, [data]);

  function toggleBottomCategory(cat: string) {
    let newBottom = [...bottomCategories];
    if (newBottom.includes(cat)) {
      newBottom = newBottom.filter((c) => c !== cat);
    } else {
      newBottom.push(cat);
    }
    setBottomCategories(newBottom);
    localStorage.setItem("fplus_bottom_categories", JSON.stringify(newBottom));
  }

  // ── Computed ──
  const groups = useMemo(() => {
    const items = (data?.items ?? []) as Formula[];
    const q = query.trim().toLowerCase();
    const filtered = q
      ? items.filter(
          (f) =>
            f.protocolo.toLowerCase().includes(q) ||
            f.categoria.toLowerCase().includes(q) ||
            f.ativos.toLowerCase().includes(q),
        )
      : items;
    const map = new Map<string, Formula[]>();
    for (const f of filtered) {
      if (!map.has(f.categoria)) map.set(f.categoria, []);
      map.get(f.categoria)!.push(f);
    }
    
    // Split entries into normal and bottom categories, preserving original sheet order for each
    const normalEntries: [string, Formula[]][] = [];
    const bottomEntries: [string, Formula[]][] = [];
    
    for (const entry of map.entries()) {
      if (bottomCategories.includes(entry[0])) {
        bottomEntries.push(entry);
      } else {
        normalEntries.push(entry);
      }
    }
    
    return [...normalEntries, ...bottomEntries];
  }, [data, query, bottomCategories]);

  const totalFormulas = (data?.items as Formula[] | undefined)?.length ?? 0;
  const filteredCount = groups.reduce((acc, [, items]) => acc + items.length, 0);

  // ── Actions ──
  async function onLogout() {
    clientClearPassword();
    await router.navigate({ to: "/" });
  }

  function openEdit(f: Formula) {
    setEditing(f);
    setDraftPrice(String(f.preco));
    setSaveError(null);
  }

  function saveEdit() {
    if (!editing) return;
    const n = Number(draftPrice.replace(",", "."));
    if (!Number.isFinite(n) || n < 0) {
      setSaveError("Digite um preço válido");
      return;
    }
    priceMutation.mutate({ rowIndex: editing.rowIndex, preco: n });
  }

  function resetAddForm() {
    setShowAdd(false);
    setAddCategoryMode("existing");
    setAddCategory("");
    setAddNewCategory("");
    setAddCategoryFixed(false);
    setAddProtocolo("");
    setAddPreco("");
    setAddAtivos("");
    setAddObs("");
    setAddError(null);
  }

  function submitAdd() {
    const cat = addCategoryMode === "new" ? addNewCategory : addCategory;
    if (!cat.trim()) {
      setAddError("Selecione ou crie uma categoria");
      return;
    }
    if (!addProtocolo.trim()) {
      setAddError("Título é obrigatório");
      return;
    }
    const precoNum = Number(addPreco.replace(",", "."));
    if (!Number.isFinite(precoNum) || precoNum < 0) {
      setAddError("Preço inválido");
      return;
    }
    setAddError(null);

    if (addCategoryMode === "new" && addCategoryFixed) {
      const newBottom = [...bottomCategories];
      if (!newBottom.includes(cat.trim())) {
        newBottom.push(cat.trim());
        setBottomCategories(newBottom);
        localStorage.setItem("fplus_bottom_categories", JSON.stringify(newBottom));
      }
    }

    addMutation.mutate({
      categoria: cat.trim(),
      protocolo: addProtocolo.trim(),
      preco: precoNum,
      ativos: addAtivos.trim(),
      observacao: addObs.trim(),
    });
  }

  function openRenameCategory(name: string) {
    setRenamingCategory(name);
    setRenameValue(name);
    setRenameError(null);
  }

  function submitRename() {
    if (!renamingCategory || !renameValue.trim()) return;
    renameMutation.mutate({
      oldName: renamingCategory,
      newName: renameValue.trim(),
    });
  }

  function handleCopy(text: string, idx?: number) {
    navigator.clipboard.writeText(text);
    if (idx !== undefined) {
      setCopiedIndex(idx);
      setTimeout(() => setCopiedIndex(null), 2000);
    } else {
      setCopiedAll(true);
      setTimeout(() => setCopiedAll(false), 2000);
    }
  }

  function openAddInCategory(categoria: string) {
    setViewingFormula(null);
    setAddCategoryMode("existing");
    setAddCategory(categoria);
    setShowAdd(true);
  }

  return (
    <div className="min-h-screen flex flex-col brand-gradient-soft">
      {/* ─── Header ─── */}
      <header className="bg-card border-b border-border/50 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-16 sm:h-[4.25rem] flex items-center justify-between gap-4">
            {/* Left: logo + name */}
            <div className="flex items-center gap-3 min-w-0">
              <Logo className="h-9 w-auto sm:h-10 shrink-0" />
              <div className="hidden sm:block min-w-0">
                <p className="text-sm font-bold leading-tight truncate tracking-tight">
                  Portal de Fórmulas
                </p>
                <p className="text-[0.7rem] text-muted-foreground leading-tight mt-0.5">
                  Dra. Francine
                </p>
              </div>
            </div>

            {/* Right: actions */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              {data?.sheetUrl && (
                <Button
                  variant="outline"
                  size="sm"
                  asChild
                  className="hidden sm:inline-flex rounded-xl border-border/60 hover:bg-accent/60 transition-all"
                >
                  <a href={data.sheetUrl} target="_blank" rel="noreferrer">
                    <ExternalLink className="h-3.5 w-3.5 mr-1.5" />
                    Planilha
                  </a>
                </Button>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => refetch()}
                disabled={isFetching}
                className="rounded-xl hover:bg-accent/60 transition-all"
              >
                <RefreshCw
                  className={`h-4 w-4 ${isFetching ? "animate-spin" : ""}`}
                />
                <span className="hidden sm:inline ml-1.5 text-xs">Atualizar</span>
              </Button>
              <div className="w-px h-5 bg-border/60 mx-0.5 hidden sm:block" />
              <Button
                variant="ghost"
                size="sm"
                onClick={onLogout}
                className="rounded-xl text-muted-foreground hover:text-foreground hover:bg-accent/60 transition-all"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline ml-1.5 text-xs">Sair</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* ─── Main ─── */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        {/* Title + Search + Add button */}
        <div className="mb-8 sm:mb-10 animate-fade-in-up">
          <div className="flex flex-col gap-5">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-[2rem] font-extrabold tracking-tight leading-tight">
                  Fórmulas e Preços
                </h1>
                <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed max-w-md">
                  Gerencie suas fórmulas, preços e categorias. Todas as alterações
                  são salvas na planilha em tempo real.
                </p>
                {!isLoading && totalFormulas > 0 && (
                  <div className="flex items-center gap-2 mt-3">
                    <Badge
                      variant="secondary"
                      className="rounded-lg text-xs font-medium px-2.5 py-1"
                    >
                      {totalFormulas} fórmulas
                    </Badge>
                    {query && filteredCount !== totalFormulas && (
                      <Badge
                        variant="outline"
                        className="rounded-lg text-xs font-medium px-2.5 py-1"
                      >
                        {filteredCount} resultado{filteredCount !== 1 ? "s" : ""}
                      </Badge>
                    )}
                  </div>
                )}
              </div>

              {/* Add button */}
              <Button
                onClick={() => setShowAdd(true)}
                className="brand-gradient text-primary-foreground rounded-xl shadow-md shadow-primary/15 hover:opacity-[0.92] transition-all active:scale-[0.98] h-10 sm:h-11 px-5 font-semibold shrink-0"
              >
                <Plus className="h-4 w-4 mr-1.5" />
                Nova Fórmula
              </Button>
            </div>

            {/* Search */}
            <div className="relative w-full sm:max-w-sm">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/60" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar fórmula, ativo ou categoria…"
                className="pl-10 h-11 bg-white/60 border-border/50 rounded-xl text-sm placeholder:text-muted-foreground/50 transition-all duration-200 focus:bg-white focus:border-ring focus:ring-2 focus:ring-ring/15"
              />
            </div>
          </div>
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="rounded-2xl border border-border/40 overflow-hidden"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="h-4 skeleton-shimmer rounded-t-2xl" />
                <div className="p-5 space-y-3">
                  <div className="h-5 w-3/4 skeleton-shimmer rounded-lg" />
                  <div className="h-4 w-1/2 skeleton-shimmer rounded-lg" />
                  <div className="flex gap-2 mt-3">
                    <div className="h-6 w-16 skeleton-shimmer rounded-md" />
                    <div className="h-6 w-20 skeleton-shimmer rounded-md" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : groups.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 animate-fade-in">
            <div className="h-16 w-16 rounded-2xl bg-muted/60 flex items-center justify-center mb-5">
              <Search className="h-7 w-7 text-muted-foreground/50" />
            </div>
            <p className="text-muted-foreground font-medium">
              Nenhuma fórmula encontrada
            </p>
            {query && (
              <button
                onClick={() => setQuery("")}
                className="mt-2 text-sm text-primary hover:underline underline-offset-4 cursor-pointer"
              >
                Limpar busca
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-10">
            {groups.map(([categoria, items], groupIndex) => (
              <section
                key={categoria}
                className="animate-fade-in-up"
                style={{ animationDelay: `${groupIndex * 60}ms` }}
              >
                {/* Category header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="h-7 w-1 rounded-full brand-gradient shrink-0" />
                    <h2 className="text-lg sm:text-xl font-bold text-foreground truncate">
                      {categoria}
                    </h2>
                    {bottomCategories.includes(categoria) && (
                      <Badge variant="outline" className="hidden sm:inline-flex text-[0.65rem] shrink-0 border-border/60 text-muted-foreground ml-1">
                        <ArrowDownToLine className="h-3 w-3 mr-1" />
                        Fixado no final
                      </Badge>
                    )}
                  </div>
                  <Badge
                    variant="secondary"
                    className="shrink-0 rounded-lg text-[0.65rem] font-semibold px-2 py-0.5 tabular-nums"
                  >
                    {items.length}
                  </Badge>
                  {/* Rename category button */}
                  <button
                    onClick={() => openRenameCategory(categoria)}
                    className="shrink-0 p-1.5 rounded-lg text-muted-foreground/50 hover:text-primary hover:bg-accent/60 transition-all cursor-pointer"
                    aria-label={`Renomear categoria ${categoria}`}
                    title="Renomear categoria"
                  >
                    <FolderPen className="h-4 w-4" />
                  </button>
                </div>

                {/* Cards grid */}
                <div className="grid gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map((f, i) => (
                    <article
                      key={f.id}
                      onClick={() => setViewingFormula(f)}
                      className="group bg-white/70 card-shadow hover:card-shadow-hover rounded-2xl border border-white/60 p-5 flex flex-col transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
                      style={{
                        animationDelay: `${groupIndex * 60 + i * 30}ms`,
                      }}
                    >
                      {/* Top row */}
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0 flex-1">
                          <h3 className="font-semibold text-foreground leading-snug text-[0.95rem]">
                            {f.protocolo}
                          </h3>
                          {f.observacao && (
                            <p className="text-xs text-muted-foreground mt-1 italic leading-relaxed line-clamp-2">
                              {f.observacao}
                            </p>
                          )}
                        </div>

                        {/* Price button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            openEdit(f);
                          }}
                          className="flex items-center gap-1.5 shrink-0 rounded-xl px-3 py-2 bg-secondary/80 hover:bg-accent border border-border/40 hover:border-primary/20 transition-all duration-200 text-sm font-bold text-secondary-foreground group/btn cursor-pointer"
                          aria-label={`Editar preço de ${f.protocolo}`}
                        >
                          <span className="tabular-nums">{brl(f.preco)}</span>
                          <Pencil className="h-3 w-3 opacity-0 group-hover:opacity-60 group-hover/btn:opacity-100 transition-opacity duration-200" />
                        </button>
                      </div>

                      {/* Tags */}
                      {f.ativos && (
                        <ul className="mt-4 flex flex-wrap gap-1.5">
                          {f.ativos.split("|").map((a, idx) => (
                            <li
                              key={idx}
                              className="text-[0.68rem] px-2 py-[3px] rounded-lg bg-muted/60 text-muted-foreground font-medium leading-tight"
                            >
                              {a.trim()}
                            </li>
                          ))}
                        </ul>
                      )}
                    </article>
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </main>

      {/* ─── Footer ─── */}
      <footer className="border-t border-border/30 py-6">
        <p className="text-center text-xs text-muted-foreground/50 tracking-wide">
          © {new Date().getFullYear()} Fórmula Plus — Farmácia de Manipulação
        </p>
      </footer>

      {/* ═══════════════════════════════════════════════
          Dialog: View Formula
         ═══════════════════════════════════════════════ */}
      <Dialog open={!!viewingFormula} onOpenChange={(o) => !o && setViewingFormula(null)}>
        <DialogContent className="sm:max-w-md rounded-2xl border-border/50 p-0 overflow-hidden">
          <div className="h-1 brand-gradient" />
          <div className="px-6 pt-5 pb-6 sm:px-7">
            <DialogHeader className="text-left mb-5">
              <DialogTitle className="text-lg font-bold leading-tight pr-6">
                {viewingFormula?.protocolo}
              </DialogTitle>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="secondary" className="font-semibold text-[0.7rem] px-2 py-0.5 rounded-md">
                  {viewingFormula?.categoria}
                </Badge>
                <span className="text-sm font-bold text-muted-foreground tabular-nums">
                  {viewingFormula ? brl(viewingFormula.preco) : ""}
                </span>
              </div>
            </DialogHeader>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium text-foreground/80">
                  Ativos ({viewingFormula?.ativos.split("|").filter(a => a.trim()).length || 0})
                </Label>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleCopy(viewingFormula?.ativos.split("|").map((a) => a.trim()).filter(Boolean).join(", ") || "")}
                  className="h-8 text-xs font-semibold px-3 rounded-lg text-primary hover:text-primary hover:bg-primary/10"
                >
                  {copiedAll ? <Check className="h-3.5 w-3.5 mr-1.5" /> : <Copy className="h-3.5 w-3.5 mr-1.5" />}
                  {copiedAll ? "Copiados!" : "Copiar todos"}
                </Button>
              </div>

              <ul className="space-y-2 max-h-[40vh] overflow-y-auto pr-1">
                {viewingFormula?.ativos.split("|").filter(a => a.trim()).map((a, idx) => (
                  <li
                    key={idx}
                    className="flex items-center justify-between gap-3 p-3 rounded-xl bg-muted/40 border border-border/50 hover:bg-muted/60 transition-colors"
                  >
                    <span className="text-sm font-medium text-foreground/90 leading-tight">
                      {a.trim()}
                    </span>
                    <button
                      onClick={() => handleCopy(a.trim(), idx)}
                      className="shrink-0 p-1.5 rounded-md text-muted-foreground/60 hover:text-primary hover:bg-white hover:shadow-sm transition-all"
                      title="Copiar ativo"
                    >
                      {copiedIndex === idx ? (
                        <Check className="h-4 w-4 text-green-600" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </button>
                  </li>
                ))}
              </ul>

              {viewingFormula?.observacao && (
                <div className="mt-4 p-3.5 rounded-xl bg-accent/50 border border-accent">
                  <Label className="text-xs font-bold text-foreground/70 uppercase tracking-wider mb-1 block">
                    Observação
                  </Label>
                  <p className="text-sm text-foreground/80 leading-relaxed">
                    {viewingFormula.observacao}
                  </p>
                </div>
              )}
            </div>

            <DialogFooter className="mt-7 flex flex-col gap-2 sm:flex-row sm:justify-between sm:items-center">
              <Button
                variant="outline"
                className="w-full sm:w-auto rounded-xl border-border/60 hover:bg-accent/60"
                onClick={() => {
                  if (viewingFormula) openAddInCategory(viewingFormula.categoria);
                }}
              >
                <Plus className="h-4 w-4 mr-1.5" />
                Adicionar nesta categoria
              </Button>
              <Button
                variant="ghost"
                onClick={() => setViewingFormula(null)}
                className="w-full sm:w-auto rounded-xl"
              >
                Fechar
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>

      {/* ═══════════════════════════════════════════════
          Dialog: Edit Price
         ═══════════════════════════════════════════════ */}
      <Dialog
        open={!!editing}
        onOpenChange={(o) => {
          if (!o) {
            setEditing(null);
            setSaveError(null);
          }
        }}
      >
        <DialogContent className="sm:max-w-md rounded-2xl border-border/50 p-0 overflow-hidden">
          <div className="h-1 brand-gradient" />
          <div className="px-6 pt-5 pb-6 sm:px-7">
            <DialogHeader className="text-left">
              <DialogTitle className="text-lg font-bold">Atualizar preço</DialogTitle>
              <DialogDescription className="flex items-center gap-1.5 text-sm mt-1">
                <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
                {editing?.protocolo}
              </DialogDescription>
            </DialogHeader>

            <div className="mt-5 space-y-2.5">
              <Label htmlFor="preco" className="text-sm font-medium text-foreground/80">
                Novo preço (R$)
              </Label>
              <Input
                id="preco"
                inputMode="decimal"
                value={draftPrice}
                onChange={(e) => setDraftPrice(e.target.value)}
                placeholder="0,00"
                autoFocus
                className="h-12 rounded-xl text-base bg-muted/30 border-border/50 transition-all duration-200 focus:bg-white focus:border-ring focus:ring-2 focus:ring-ring/20"
              />
              {saveError && <ErrorBanner message={saveError} />}
            </div>

            <DialogFooter className="mt-6 gap-2 sm:gap-2">
              <Button
                variant="destructive"
                className="mr-auto rounded-xl shadow-sm hover:opacity-[0.92] transition-all"
                onClick={() => {
                  if (editing && window.confirm("Tem certeza que deseja excluir esta fórmula?")) {
                    deleteMutation.mutate({ rowIndex: editing.rowIndex });
                  }
                }}
                disabled={deleteMutation.isPending || priceMutation.isPending}
              >
                {deleteMutation.isPending ? <Spinner label="Excluindo…" /> : (
                  <>
                    <Trash2 className="h-4 w-4 mr-1.5" />
                    Excluir
                  </>
                )}
              </Button>
              <Button
                variant="outline"
                onClick={() => setEditing(null)}
                disabled={priceMutation.isPending || deleteMutation.isPending}
                className="rounded-xl border-border/50"
              >
                Cancelar
              </Button>
              <Button
                onClick={saveEdit}
                disabled={priceMutation.isPending || deleteMutation.isPending}
                className="brand-gradient text-primary-foreground rounded-xl shadow-md shadow-primary/15 hover:opacity-[0.92] transition-all active:scale-[0.98]"
              >
                {priceMutation.isPending ? <Spinner label="Salvando…" /> : "Salvar"}
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>

      {/* ═══════════════════════════════════════════════
          Dialog: Add Formula
         ═══════════════════════════════════════════════ */}
      <Dialog
        open={showAdd}
        onOpenChange={(o) => {
          if (!o) resetAddForm();
        }}
      >
        <DialogContent className="sm:max-w-lg rounded-2xl border-border/50 p-0 overflow-hidden max-h-[90vh] overflow-y-auto">
          <div className="h-1 brand-gradient" />
          <div className="px-6 pt-5 pb-6 sm:px-7">
            <DialogHeader className="text-left">
              <DialogTitle className="text-lg font-bold flex items-center gap-2">
                <Plus className="h-5 w-5 text-primary" />
                Nova Fórmula
              </DialogTitle>
              <DialogDescription className="text-sm mt-1">
                Preencha os dados abaixo. A fórmula será adicionada à planilha.
              </DialogDescription>
            </DialogHeader>

            <div className="mt-6 space-y-5">
              {/* Category */}
              <div className="space-y-2.5">
                <Label className="text-sm font-medium text-foreground/80 flex items-center gap-1.5">
                  <Tag className="h-3.5 w-3.5 text-muted-foreground" />
                  Categoria
                </Label>

                {existingCategories.length > 0 && (
                  <Select
                    value={addCategoryMode === "new" ? NEW_CATEGORY_VALUE : addCategory}
                    onValueChange={(val) => {
                      if (val === NEW_CATEGORY_VALUE) {
                        setAddCategoryMode("new");
                        setAddCategory("");
                      } else {
                        setAddCategoryMode("existing");
                        setAddCategory(val);
                      }
                    }}
                  >
                    <SelectTrigger className="h-11 rounded-xl bg-muted/30 border-border/50 transition-all focus:bg-white focus:border-ring focus:ring-2 focus:ring-ring/20">
                      <SelectValue placeholder="Selecione uma categoria" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                      {existingCategories.map((cat) => (
                        <SelectItem key={cat} value={cat} className="rounded-lg">
                          {cat}
                        </SelectItem>
                      ))}
                      <SelectItem
                        value={NEW_CATEGORY_VALUE}
                        className="rounded-lg text-primary font-medium"
                      >
                        + Criar nova categoria
                      </SelectItem>
                    </SelectContent>
                  </Select>
                )}

                {(addCategoryMode === "new" || existingCategories.length === 0) && (
                  <div className="space-y-3">
                    <Input
                      value={addNewCategory}
                      onChange={(e) => setAddNewCategory(e.target.value)}
                      placeholder="Nome da nova categoria"
                      className="h-11 rounded-xl bg-muted/30 border-border/50 transition-all focus:bg-white focus:border-ring focus:ring-2 focus:ring-ring/20"
                    />
                    <label className="flex items-center gap-2 text-sm text-foreground/80 cursor-pointer w-max select-none">
                      <input
                        type="checkbox"
                        checked={addCategoryFixed}
                        onChange={(e) => setAddCategoryFixed(e.target.checked)}
                        className="rounded border-border/50 text-primary focus:ring-primary/20 cursor-pointer w-4 h-4"
                      />
                      <span>Fixar essa categoria no final da página</span>
                    </label>
                  </div>
                )}
              </div>

              {/* Title (Protocolo) */}
              <div className="space-y-2.5">
                <Label
                  htmlFor="add-protocolo"
                  className="text-sm font-medium text-foreground/80"
                >
                  Título da fórmula
                </Label>
                <Input
                  id="add-protocolo"
                  value={addProtocolo}
                  onChange={(e) => setAddProtocolo(e.target.value)}
                  placeholder="Ex: Hormônio Bioidêntico 01"
                  className="h-11 rounded-xl bg-muted/30 border-border/50 transition-all focus:bg-white focus:border-ring focus:ring-2 focus:ring-ring/20"
                />
              </div>

              {/* Price */}
              <div className="space-y-2.5">
                <Label
                  htmlFor="add-preco"
                  className="text-sm font-medium text-foreground/80"
                >
                  Preço (R$)
                </Label>
                <Input
                  id="add-preco"
                  inputMode="decimal"
                  value={addPreco}
                  onChange={(e) => setAddPreco(e.target.value)}
                  placeholder="0,00"
                  className="h-11 rounded-xl bg-muted/30 border-border/50 transition-all focus:bg-white focus:border-ring focus:ring-2 focus:ring-ring/20"
                />
              </div>

              {/* Ativos */}
              <div className="space-y-2.5">
                <Label
                  htmlFor="add-ativos"
                  className="text-sm font-medium text-foreground/80"
                >
                  Ativos{" "}
                  <span className="text-muted-foreground font-normal">
                    (separar com |)
                  </span>
                </Label>
                <Input
                  id="add-ativos"
                  value={addAtivos}
                  onChange={(e) => setAddAtivos(e.target.value)}
                  placeholder="Estradiol | Progesterona | DHEA"
                  className="h-11 rounded-xl bg-muted/30 border-border/50 transition-all focus:bg-white focus:border-ring focus:ring-2 focus:ring-ring/20"
                />
              </div>

              {/* Observação */}
              <div className="space-y-2.5">
                <Label
                  htmlFor="add-obs"
                  className="text-sm font-medium text-foreground/80"
                >
                  Observação{" "}
                  <span className="text-muted-foreground font-normal">(opcional)</span>
                </Label>
                <Input
                  id="add-obs"
                  value={addObs}
                  onChange={(e) => setAddObs(e.target.value)}
                  placeholder="Notas adicionais"
                  className="h-11 rounded-xl bg-muted/30 border-border/50 transition-all focus:bg-white focus:border-ring focus:ring-2 focus:ring-ring/20"
                />
              </div>

              {addError && <ErrorBanner message={addError} />}
            </div>

            <DialogFooter className="mt-7 gap-2 sm:gap-2">
              <Button
                variant="outline"
                onClick={resetAddForm}
                disabled={addMutation.isPending}
                className="rounded-xl border-border/50"
              >
                Cancelar
              </Button>
              <Button
                onClick={submitAdd}
                disabled={addMutation.isPending}
                className="brand-gradient text-primary-foreground rounded-xl shadow-md shadow-primary/15 hover:opacity-[0.92] transition-all active:scale-[0.98]"
              >
                {addMutation.isPending ? (
                  <Spinner label="Adicionando…" />
                ) : (
                  <span className="flex items-center gap-1.5">
                    <Plus className="h-4 w-4" />
                    Adicionar
                  </span>
                )}
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>

      {/* ═══════════════════════════════════════════════
          Dialog: Rename Category
         ═══════════════════════════════════════════════ */}
      <Dialog
        open={!!renamingCategory}
        onOpenChange={(o) => {
          if (!o) {
            setRenamingCategory(null);
            setRenameError(null);
          }
        }}
      >
        <DialogContent className="sm:max-w-md rounded-2xl border-border/50 p-0 overflow-hidden">
          <div className="h-1 brand-gradient" />
          <div className="px-6 pt-5 pb-6 sm:px-7">
            <DialogHeader className="text-left">
              <DialogTitle className="text-lg font-bold flex items-center gap-2">
                <FolderPen className="h-5 w-5 text-primary" />
                Renomear Categoria
              </DialogTitle>
              <DialogDescription className="text-sm mt-1">
                Todas as fórmulas da categoria{" "}
                <strong className="text-foreground">"{renamingCategory}"</strong> serão
                atualizadas na planilha.
              </DialogDescription>
            </DialogHeader>

            <div className="mt-5 space-y-2.5">
              <Label
                htmlFor="rename-cat"
                className="text-sm font-medium text-foreground/80"
              >
                Novo nome
              </Label>
              <Input
                id="rename-cat"
                value={renameValue}
                onChange={(e) => setRenameValue(e.target.value)}
                placeholder="Nome da categoria"
                autoFocus
                className="h-12 rounded-xl text-base bg-muted/30 border-border/50 transition-all duration-200 focus:bg-white focus:border-ring focus:ring-2 focus:ring-ring/20"
              />
              {renameError && <ErrorBanner message={renameError} />}
            </div>

            <DialogFooter className="mt-6 gap-2 sm:gap-2">
              <Button
                variant="outline"
                onClick={() => setRenamingCategory(null)}
                disabled={renameMutation.isPending}
                className="rounded-xl border-border/50"
              >
                Cancelar
              </Button>
              <Button
                onClick={submitRename}
                disabled={renameMutation.isPending || !renameValue.trim()}
                className="brand-gradient text-primary-foreground rounded-xl shadow-md shadow-primary/15 hover:opacity-[0.92] transition-all active:scale-[0.98]"
              >
                {renameMutation.isPending ? <Spinner label="Renomeando…" /> : "Renomear"}
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

/* ─── Shared micro-components ─── */

function ErrorBanner({ message }: { message: string }) {
  return (
    <div className="flex items-center gap-2 rounded-xl bg-destructive/8 border border-destructive/15 px-3.5 py-2.5 animate-fade-in">
      <div className="h-1.5 w-1.5 rounded-full bg-destructive shrink-0" />
      <p className="text-sm text-destructive font-medium" role="alert">
        {message}
      </p>
    </div>
  );
}

function Spinner({ label }: { label: string }) {
  return (
    <span className="flex items-center gap-2">
      <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
      {label}
    </span>
  );
}
