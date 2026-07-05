export function isDatabaseConfigured() {
  return Boolean(process.env.DATABASE_URL);
}

export const databaseMissingMessage =
  "Base de donnees non configuree. Ajoutez DATABASE_URL dans .env pour activer l'inscription et la connexion.";
