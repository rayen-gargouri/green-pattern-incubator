"use client";

import { useActionState } from "react";
import { LogIn } from "lucide-react";
import { loginUser } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";

export function LoginForm() {
  const [state, action, pending] = useActionState(loginUser, { ok: true, message: "" });

  return (
    <form action={action} className="grid gap-4 rounded-lg border bg-white p-6 shadow-sm">
      <label className="grid gap-2 text-sm font-medium">
        Email
        <input name="email" type="email" required className="h-11 rounded-md border px-3 font-normal" />
      </label>
      <label className="grid gap-2 text-sm font-medium">
        Mot de passe
        <input name="password" type="password" required className="h-11 rounded-md border px-3 font-normal" />
      </label>
      {!state.ok ? <p className="text-sm text-red-600">{state.message}</p> : null}
      <Button disabled={pending}>
        <LogIn className="h-4 w-4" />
        {pending ? "Connexion..." : "Se connecter"}
      </Button>
    </form>
  );
}
