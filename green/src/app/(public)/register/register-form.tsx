"use client";

import { useActionState } from "react";
import { UserPlus } from "lucide-react";
import { registerUser } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";

export function RegisterForm() {
  const [state, action, pending] = useActionState(registerUser, { ok: true, message: "" });

  return (
    <form action={action} className="grid gap-4 rounded-lg border bg-white p-6 shadow-sm">
      <label className="grid gap-2 text-sm font-medium">
        Nom
        <input name="name" required className="h-11 rounded-md border px-3 font-normal" />
      </label>
      <label className="grid gap-2 text-sm font-medium">
        Email
        <input name="email" type="email" required className="h-11 rounded-md border px-3 font-normal" />
      </label>
      <label className="grid gap-2 text-sm font-medium">
        Role
        <select name="role" required className="h-11 rounded-md border px-3 font-normal">
          <option value="entrepreneur">Entrepreneur</option>
          <option value="expert">Expert / mentor</option>
          <option value="admin">Administrateur</option>
        </select>
      </label>
      <label className="grid gap-2 text-sm font-medium">
        Mot de passe
        <input name="password" type="password" minLength={8} required className="h-11 rounded-md border px-3 font-normal" />
      </label>
      {!state.ok ? <p className="text-sm text-red-600">{state.message}</p> : null}
      <Button disabled={pending}>
        <UserPlus className="h-4 w-4" />
        {pending ? "Creation..." : "Creer mon compte"}
      </Button>
    </form>
  );
}
