import { createFileRoute, redirect, useRouter } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login, clientIsAuthenticated, clientSetPassword, requireAuth } from "@/lib/auth";
import { Lock, ArrowRight, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/")(  {
  head: () => ({
    meta: [
      { title: "Fórmula Plus — Acesso restrito" },
      { name: "description", content: "Portal de fórmulas e preços da Fórmula Plus." },
    ],
  }),
  beforeLoad: async () => {
    // Server-side: if session cookie is valid, redirect away from login page.
    if (typeof window === "undefined") {
      try { await requireAuth(); throw redirect({ to: "/ativos" }); } catch (e: unknown) {
        // If requireAuth threw a redirect, re-throw it; otherwise (no session) stay on login.
        if (e && typeof e === "object" && "_isRedirect" in e) throw e;
      }
    } else if (clientIsAuthenticated()) {
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
    <main className="brand-gradient-soft min-h-screen flex items-center justify-center px-4 py-10 sm:py-16">
      {/* Decorative blobs */}
      <div
        className="pointer-events-none fixed inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-primary/[0.06] blur-3xl" />
        <div className="absolute -bottom-40 -right-40 h-[28rem] w-[28rem] rounded-full bg-leaf/[0.06] blur-3xl" />
      </div>

      <div className="relative w-full max-w-[26rem] animate-fade-in-up">
        {/* Card */}
        <div className="glass card-shadow rounded-3xl px-7 sm:px-10 py-10 sm:py-12 border border-white/60">
          {/* Logo & heading */}
          <div className="flex flex-col items-center text-center">
            <div className="relative">
              <div className="absolute -inset-3 rounded-full bg-primary/[0.07] blur-xl" />
              <Logo className="relative h-20 w-auto sm:h-24 drop-shadow-sm" />
            </div>

            <h1 className="mt-7 text-[1.65rem] sm:text-3xl font-extrabold tracking-tight text-foreground leading-tight">
              Portal de Fórmulas
            </h1>
            <p className="mt-2 text-sm text-muted-foreground max-w-[18rem] leading-relaxed">
              Acesso restrito à equipe autorizada
            </p>
          </div>

          {/* Divider */}
          <div className="mt-8 mb-7 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

          {/* Form */}
          <form onSubmit={onSubmit} className="space-y-5">
            <div className="space-y-2.5">
              <Label
                htmlFor="password"
                className="text-sm font-medium text-foreground/80 flex items-center gap-1.5"
              >
                <Lock className="h-3.5 w-3.5 text-muted-foreground" />
                Senha de acesso
              </Label>
              <Input
                id="password"
                type="password"
                autoComplete="current-password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoFocus
                className="h-12 bg-white/50 border-border/70 rounded-xl text-base placeholder:text-muted-foreground/50 transition-all duration-200 focus:bg-white focus:border-ring focus:ring-2 focus:ring-ring/20"
              />
            </div>

            {error && (
              <div className="flex items-center gap-2 rounded-xl bg-destructive/8 border border-destructive/15 px-3.5 py-2.5 animate-fade-in">
                <div className="h-1.5 w-1.5 rounded-full bg-destructive shrink-0" />
                <p className="text-sm text-destructive font-medium" role="alert">
                  {error}
                </p>
              </div>
            )}

            <Button
              type="submit"
              className="w-full h-12 brand-gradient text-primary-foreground hover:opacity-[0.92] font-semibold text-base rounded-xl shadow-lg shadow-primary/20 transition-all duration-200 active:scale-[0.98] cursor-pointer"
              disabled={loading || !password}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Entrando…
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  Entrar
                  <ArrowRight className="h-4 w-4" />
                </span>
              )}
            </Button>
          </form>

          {/* Trust signal */}
          <div className="mt-6 flex items-center justify-center gap-1.5 text-xs text-muted-foreground/70">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>Conexão segura e criptografada</span>
          </div>
        </div>

        {/* Footer */}
        <p className="mt-8 text-center text-xs text-muted-foreground/60 tracking-wide">
          © {new Date().getFullYear()} Fórmula Plus — Farmácia de Manipulação
        </p>
      </div>
    </main>
  );
}
