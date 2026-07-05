export type MentorChatRole = "user" | "assistant";

export type MentorChatPayloadMessage = {
  role: MentorChatRole;
  content: string;
};

export function normalizeMentorText(message: string) {
  return message
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

export function buildMentorMockResponse(message: string) {
  const text = normalizeMentorText(message);

  if (text.includes("pitch")) {
    return [
      "Pour preparer un pitch clair, utilisez cette structure:",
      "1. Accroche: le probleme ecologique en une phrase.",
      "2. Probleme: qui est touche et pourquoi c'est urgent.",
      "3. Solution: ce que vous proposez concretement.",
      "4. Cible: premiers clients ou beneficiaires.",
      "5. Impact: indicateur environnemental mesurable.",
      "6. Appel a l'action: financement, mentorat, pilote ou partenariat."
    ].join("\n");
  }

  if (text.includes("business model canvas") || text.includes("bmc") || text.includes("canvas")) {
    return [
      "Le Business Model Canvas sert a verifier la coherence de votre projet.",
      "Commencez par 4 blocs essentiels: proposition de valeur, segments clients, revenus et couts.",
      "Ajoutez ensuite canaux, relation client, activites cles, ressources cles et partenaires cles.",
      "Pour un projet vert, reliez toujours la proposition de valeur a un impact mesurable."
    ].join("\n");
  }

  if (text.includes("financement") || text.includes("financer") || text.includes("budget")) {
    return [
      "Pour le financement, commencez par chiffrer le besoin minimum du prochain test.",
      "Pistes possibles: concours de startups vertes, subventions publiques, incubateurs, fondations, precommandes, partenariats B2B et investisseurs a impact.",
      "Preparez un budget simple: prototype, operations, marketing, mesure d'impact et marge de securite."
    ].join("\n");
  }

  if (text.includes("risque") || text.includes("risques")) {
    return [
      "Voici quelques risques frequents a verifier:",
      "1. Impact environnemental difficile a mesurer.",
      "2. Cible trop large ou probleme pas assez prioritaire.",
      "3. Cout de production ou de distribution sous-estime.",
      "4. Dependance a un partenaire cle.",
      "5. Promesse verte percue comme du greenwashing.",
      "Transformez chaque risque en test concret."
    ].join("\n");
  }

  if (
    text.includes("prochaine etape") ||
    text.includes("prochaines etapes") ||
    text.includes("actions") ||
    text.includes("quoi faire")
  ) {
    return [
      "Voici 3 actions concretes pour avancer:",
      "1. Interroger 5 a 10 personnes de votre cible pour confirmer le probleme.",
      "2. Completer votre Business Model Canvas avec revenus, couts et partenaires.",
      "3. Definir 3 indicateurs d'impact simples avant de lancer un pilote."
    ].join("\n");
  }

  if (text.includes("marketing") || text.includes("marche") || text.includes("client")) {
    return [
      "Pour clarifier le marche, choisissez une cible prioritaire tres precise.",
      "Decrivez son probleme, ses alternatives actuelles, son budget et le canal par lequel vous pouvez l'atteindre.",
      "Ensuite, testez un message simple: probleme, benefice, preuve d'impact et invitation a essayer."
    ].join("\n");
  }

  if (text.includes("impact") || text.includes("environnement")) {
    return [
      "Pour rendre l'impact credible, partez d'une situation de reference.",
      "Choisissez 2 ou 3 indicateurs mesurables: dechets evites, CO2 evite, eau economisee, energie economisee ou beneficiaires touches.",
      "Mesurez avant/apres pendant un pilote court."
    ].join("\n");
  }

  return [
    "Bonne question. Comme mentor, je vous conseille de transformer votre idee en hypothese testable.",
    "Clarifiez le probleme, la cible, la solution, le modele economique et l'impact attendu.",
    "Puis choisissez une action courte a realiser cette semaine: entretien client, mini-prototype, budget pilote ou pitch d'une minute."
  ].join("\n");
}
