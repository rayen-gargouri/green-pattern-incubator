import Link from "next/link";
import type { Project } from "@/lib/types";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { StatusBadge } from "@/components/status-badge";

export function ProjectCard({ project, href = `/dashboard/projects/${project.id}` }: { project: Project; href?: string }) {
  return (
    <Card className="flex h-full flex-col">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <CardTitle>{project.name}</CardTitle>
          <CardDescription>{project.slogan}</CardDescription>
        </div>
        <StatusBadge label={project.stage} />
      </div>
      <p className="mb-5 text-sm leading-6 text-muted-foreground">{project.shortDescription}</p>
      <div className="mt-auto space-y-4">
        <ProgressBar value={project.progress} />
        <Link href={href} className="inline-flex text-sm font-semibold text-primary">
          Consulter le projet
        </Link>
      </div>
    </Card>
  );
}
