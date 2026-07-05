import { LoginForm } from "@/app/(public)/login/login-form";
import { RegisterForm } from "@/app/(public)/register/register-form";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";

export default function AuthPage() {
  return (
    <section className="container-page py-16">
      <div className="mb-8 max-w-2xl">
        <p className="text-sm font-semibold uppercase text-primary">Acces plateforme</p>
        <h1 className="mt-3 text-4xl font-bold">Connexion et inscription</h1>
        <p className="mt-4 text-muted-foreground">
          Connectez-vous avec un compte demo ou creez un profil local pour tester le MVP.
        </p>
      </div>
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-4">
          <LoginForm />
          <Card>
            <CardTitle>Comptes demo</CardTitle>
            <CardDescription className="mt-2">
              Entrepreneur: demo@greenpattern.test / demo123
              <br />
              Expert: expert@greenpattern.test / expert123
              <br />
              Admin: admin@greenpattern.test / admin123
            </CardDescription>
          </Card>
        </div>
        <RegisterForm />
      </div>
    </section>
  );
}
