import { FeedbackCard } from "@/components/ui/FeedbackCard";

export default function ExpertFeedbacksPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Feedbacks</h2>
        <p className="mt-2 text-muted-foreground">Retrouvez les retours transmis aux entrepreneurs.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <FeedbackCard
          title="EcoPack Tunisia"
          author="Feedback envoye"
          content="Ajouter un test comparatif avec emballage plastique classique et emballage compostable."
        />
        <FeedbackCard
          title="RecyClean"
          author="Feedback envoye"
          content="Documenter les volumes collectes par quartier et la qualite du tri apres deux semaines."
        />
      </div>
    </div>
  );
}
