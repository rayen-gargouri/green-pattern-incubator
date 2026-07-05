import { AiConsole } from "./ai-console";

export default function AiPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase text-primary">Assistant IA Green Coach</p>
        <h1 className="mt-2 text-3xl font-bold">Ameliorer un projet avec l'IA</h1>
        <p className="mt-2 text-muted-foreground">
          Analyse d'idee, business model, SWOT, argumentaire, impact ecologique et plan d'action.
        </p>
      </div>
      <AiConsole />
    </div>
  );
}
