import { createFileRoute, redirect, useRouter } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useMemo, useState } from "react";
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
import { Badge } from "@/components/ui/badge";
import { Search, Pencil, LogOut, ExternalLink, RefreshCw } from "lucide-react";
import { clientIsAuthenticated, clientGetPassword, clientClearPassword } from "@/lib/auth";
import { listFormulas, setPrice } from "@/lib/formulas.functions";

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
    <div className="min-h-screen flex items-center justify-center p-6 text-center">
      <div>
        <p className="text-destructive font-semibold">Erro ao carregar.</p>
        <p className="text-sm text-muted-foreground mt-2">{error.message}</p>
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

function AtivosPage() {
  const router = useRouter();
  const qc = useQueryClient();
  const listFn = useServerFn(listFormulas);
  const setPriceFn = useServerFn(setPrice);
  

  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: ["formulas"],
    queryFn: () => listFn(),
  });

  const [query, setQuery] = useState("");
  const [editing, setEditing] = useState<Formula | null>(null);
  const [draftPrice, setDraftPrice] = useState("");
  const [saveError, setSaveError] = useState<string | null>(null);

  const mutation = useMutation({
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
    return Array.from(map.entries());
  }, [data, query]);

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
    mutation.mutate({ rowIndex: editing.rowIndex, preco: n });
  }

  return (
    <div className="min-h-screen brand-gradient-soft">
      <header className="border-b border-border/60 bg-card/80 backdrop-blur sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <Logo className="h-10 w-auto" />
            <div className="hidden sm:block min-w-0">
              <p className="text-sm font-semibold leading-tight truncate">
                Portal de Fórmulas
              </p>
              <p className="text-xs text-muted-foreground">Dra. Francine</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {data?.sheetUrl && (
              <Button
                variant="outline"
                size="sm"
                asChild
                className="hidden sm:inline-flex"
              >
                <a href={data.sheetUrl} target="_blank" rel="noreferrer">
                  <ExternalLink className="h-4 w-4 mr-1.5" />
                  Planilha
                </a>
              </Button>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={() => refetch()}
              disabled={isFetching}
            >
              <RefreshCw className={`h-4 w-4 ${isFetching ? "animate-spin" : ""}`} />
              <span className="hidden sm:inline ml-1.5">Atualizar</span>
            </Button>
            <Button variant="ghost" size="sm" onClick={onLogout}>
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline ml-1.5">Sair</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Fórmulas e Preços</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Toque em um preço para atualizá-lo. As alterações são salvas na planilha.
            </p>
          </div>
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar fórmula, ativo ou categoria…"
              className="pl-9 h-10 bg-card"
            />
          </div>
        </div>

        {isLoading ? (
          <div className="grid gap-3">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="h-28 bg-card/60 animate-pulse rounded-xl border border-border/60"
              />
            ))}
          </div>
        ) : groups.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            Nenhuma fórmula encontrada.
          </div>
        ) : (
          <div className="space-y-8">
            {groups.map(([categoria, items]) => (
              <section key={categoria}>
                <div className="flex items-baseline gap-3 mb-3">
                  <h2 className="text-lg font-semibold text-foreground">{categoria}</h2>
                  <Badge variant="secondary" className="text-xs">
                    {items.length}
                  </Badge>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {items.map((f) => (
                    <article
                      key={f.id}
                      className="group bg-card card-shadow rounded-xl border border-border/60 p-4 sm:p-5 flex flex-col"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <h3 className="font-semibold text-foreground leading-tight">
                            {f.protocolo}
                          </h3>
                          {f.observacao && (
                            <p className="text-xs text-muted-foreground mt-1 italic">
                              {f.observacao}
                            </p>
                          )}
                        </div>
                        <button
                          onClick={() => openEdit(f)}
                          className="flex items-center gap-1.5 shrink-0 rounded-lg px-3 py-1.5 bg-secondary hover:bg-accent transition text-sm font-semibold text-secondary-foreground"
                          aria-label={`Editar preço de ${f.protocolo}`}
                        >
                          <span className="tabular-nums">{brl(f.preco)}</span>
                          <Pencil className="h-3.5 w-3.5 opacity-60 group-hover:opacity-100" />
                        </button>
                      </div>

                      {f.ativos && (
                        <ul className="mt-3 flex flex-wrap gap-1.5">
                          {f.ativos.split("|").map((a, i) => (
                            <li
                              key={i}
                              className="text-xs px-2 py-0.5 rounded-md bg-muted text-muted-foreground"
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

      <Dialog
        open={!!editing}
        onOpenChange={(o) => {
          if (!o) {
            setEditing(null);
            setSaveError(null);
          }
        }}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Atualizar preço</DialogTitle>
            <DialogDescription>{editing?.protocolo}</DialogDescription>
          </DialogHeader>
          <div className="space-y-2">
            <Label htmlFor="preco">Novo preço (R$)</Label>
            <Input
              id="preco"
              inputMode="decimal"
              value={draftPrice}
              onChange={(e) => setDraftPrice(e.target.value)}
              placeholder="0,00"
              autoFocus
            />
            {saveError && (
              <p className="text-sm text-destructive" role="alert">{saveError}</p>
            )}
          </div>
          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => setEditing(null)}
              disabled={mutation.isPending}
            >
              Cancelar
            </Button>
            <Button
              onClick={saveEdit}
              disabled={mutation.isPending}
              className="brand-gradient text-primary-foreground"
            >
              {mutation.isPending ? "Salvando..." : "Salvar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
