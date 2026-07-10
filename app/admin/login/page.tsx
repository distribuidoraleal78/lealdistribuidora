"use client";

import { useFormState, useFormStatus } from "react-dom";
import Image from "next/image";
import { signIn } from "@/app/actions/auth.actions";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? "Entrando..." : "Entrar"}
    </Button>
  );
}

export default function LoginPage() {
  const [state, formAction] = useFormState(signIn, { error: null });

  return (
    <div className="flex min-h-screen items-center justify-center bg-ink-900 px-4">
      <div className="w-full max-w-sm rounded-card border border-ink-border bg-ink-soft p-8">
        <div className="flex flex-col items-center gap-3">
          <Image src="/images/logo-mark.svg" alt="Leal Distribuidora" width={56} height={56} />
          <h1 className="text-lg font-semibold text-white">Painel administrativo</h1>
        </div>

        <form action={formAction} className="mt-6 space-y-4">
          <div>
            <label htmlFor="email" className="mb-1 block text-sm text-ink-muted">
              E-mail
            </label>
            <Input id="email" name="email" type="email" required autoComplete="username" />
          </div>
          <div>
            <label htmlFor="password" className="mb-1 block text-sm text-ink-muted">
              Senha
            </label>
            <Input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
            />
          </div>

          {state.error && <p className="text-sm text-red-400">{state.error}</p>}

          <SubmitButton />
        </form>
      </div>
    </div>
  );
}
