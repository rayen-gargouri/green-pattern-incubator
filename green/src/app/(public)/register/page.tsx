import Link from "next/link";
import { RegisterForm } from "./register-form";

export default function RegisterPage() {
  return (
    <section className="container-page grid min-h-[calc(100vh-200px)] place-items-center py-16">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold">Creer un compte</h1>
        <p className="mt-2 text-sm text-muted-foreground">Choisissez votre role et commencez votre parcours durable.</p>
        <div className="mt-6">
          <RegisterForm />
        </div>
        <p className="mt-4 text-sm text-muted-foreground">
          Deja inscrit ?{" "}
          <Link href="/auth" className="font-semibold text-primary">
            Se connecter
          </Link>
        </p>
      </div>
    </section>
  );
}
