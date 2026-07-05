import { ProjectForm } from "./project-form";

export default function NewProjectPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase text-primary">Creation de projet</p>
        <h1 className="mt-2 text-3xl font-bold">Creer un projet vert</h1>
        <p className="mt-2 text-muted-foreground">Completez les informations essentielles pour structurer votre idee.</p>
      </div>
      <ProjectForm />
    </div>
  );
}
