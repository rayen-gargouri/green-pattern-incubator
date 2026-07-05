import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { redirectByRole } from "@/lib/auth";

export default function UnauthorizedPage() {
  async function goToDashboard() {
    "use server";
    await redirectByRole();
  }

  return (
    <main className="grid min-h-screen place-items-center bg-background p-5">
      <Card className="max-w-md text-center">
        <CardTitle>Acces non autorise</CardTitle>
        <CardDescription className="mt-2">
          Votre role ne permet pas d'acceder a cet espace. Retournez vers votre dashboard dedie.
        </CardDescription>
        <form action={goToDashboard} className="mt-5">
          <Button>Retour a mon dashboard</Button>
        </form>
      </Card>
    </main>
  );
}
