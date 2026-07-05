import Link from "next/link";
import { LoginForm } from "./login-form";

export default function LoginPage() {
  return (
    <section className="container-page grid min-h-[calc(100vh-200px)] place-items-center py-16">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold">Connexion</h1>
        <p className="mt-2 text-sm text-muted-foreground">Accedez a votre espace Green Pattern Incubator.</p>
        <div className="mt-6">
          <LoginForm />
        </div>
        <p className="mt-4 text-sm text-muted-foreground">
          Nouveau sur la plateforme ?{" "}
          <Link href="/register" className="font-semibold text-primary">
            Creer un compte
          </Link>
        </p>
      </div>
    </section>
  );
}
