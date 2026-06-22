import { createFileRoute, redirect, useRouter } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login, clientIsAuthenticated, clientSetPassword } from "@/lib/auth";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Fórmula Plus — Acesso restrito" },
      { name: "description", content: "Portal de fórmulas e preços da Fórmula Plus." },
    ],
  }),
  beforeLoad: () => {
    if (typeof window !== "undefined" && clientIsAuthenticated()) {
      throw redirect({ to: "/ativos" });
    }
  },
  component: LoginPage,
});

function LoginPage() {
  const router = useRouter();
  const loginFn = useServerFn(login);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await loginFn({ data: { password } });
      if (!res.ok) {
        setError(res.error ?? "Senha incorreta");
      } else {
        clientSetPassword(password);
        await router.navigate({ to: "/ativos" });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao entrar");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="brand-gradient-soft min-h-screen flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <div className="bg-card card-shadow rounded-2xl px-6 sm:px-10 py-10 border border-border/60">
          <div className="flex flex-col items-center text-center">
            <Logo className="h-24 w-auto" />
            <h1 className="mt-6 text-2xl font-bold text-foreground">Portal de Fórmulas</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Acesso restrito — Dra. Francine
            </p>
          </div>

          <form onSubmit={onSubmit} className="mt-8 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">Senha de acesso</Label>
              <Input
                id="password"
                type="password"
                autoComplete="current-password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoFocus
              />
            </div>
            {error && (
              <p className="text-sm text-destructive" role="alert">{error}</p>
            )}
            <Button
              type="submit"
              className="w-full h-11 brand-gradient text-primary-foreground hover:opacity-95 font-semibold"
              disabled={loading || !password}
            >
              {loading ? "Entrando..." : "Entrar"}
            </Button>
          </form>
        </div>
        <p className="mt-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Fórmula Plus — Farmácia de Manipulação
        </p>
      </div>
    </main>
  );
}
