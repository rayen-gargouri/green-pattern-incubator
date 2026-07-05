import type { LucideIcon } from "lucide-react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { Project, Resource } from "@/lib/types";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ProgressBar } from "@/components/progress-bar";
import { StatusBadge } from "@/components/status-badge";
import { formatDate } from "@/lib/utils";

export function FeatureCard({ title, description, icon: Icon }: { title: string; description: string; icon: LucideIcon }) {
  return (
    <Card>
      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-md bg-accent text-accent-foreground">
        <Icon className="h-5 w-5" />
      </div>
      <CardTitle>{title}</CardTitle>
      <CardDescription className="mt-2">{description}</CardDescription>
    </Card>
  );
}

export function ImpactCard({ label, value, icon: Icon }: { label: string; value: string; icon: LucideIcon }) {
  return (
    <Card>
      <Icon className="mb-5 h-6 w-6 text-primary" />
      <p className="text-3xl font-bold">{value}</p>
      <p className="mt-1 text-sm text-muted-foreground">{label}</p>
    </Card>
  );
}

export function StepCard({ index, title, description, icon: Icon }: { index: number; title: string; description: string; icon: LucideIcon }) {
  return (
    <Card>
      <div className="mb-4 flex items-center justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-md bg-primary text-primary-foreground">
          <Icon className="h-5 w-5" />
        </div>
        <span className="text-sm font-semibold text-muted-foreground">0{index}</span>
      </div>
      <CardTitle>{title}</CardTitle>
      <CardDescription className="mt-2">{description}</CardDescription>
    </Card>
  );
}

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Card className="flex h-full flex-col">
      <CardHeader>
        <div className="flex items-start justify-between gap-3">
          <div>
            <CardTitle>{project.name}</CardTitle>
            <CardDescription>{project.slogan}</CardDescription>
          </div>
          <StatusBadge label={project.stage} />
        </div>
      </CardHeader>
      <p className="mb-5 text-sm leading-6 text-muted-foreground">{project.shortDescription}</p>
      <div className="mt-auto space-y-4">
        <ProgressBar value={project.progress} />
        <Link href={`/dashboard/projects/${project.id}`} className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
          Ouvrir le projet
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </Card>
  );
}

export function ResourceCard({ resource }: { resource: Resource }) {
  return (
    <Card>
      <div className="mb-3 flex items-center justify-between gap-3">
        <StatusBadge label={resource.category} />
        <span className="text-xs text-muted-foreground">{formatDate(resource.createdAt)}</span>
      </div>
      <CardTitle>{resource.title}</CardTitle>
      <CardDescription className="mt-2">{resource.description}</CardDescription>
      <div className="mt-5 flex items-center justify-between text-sm">
        <span className="font-medium">{resource.type}</span>
        <Link href={resource.url} className="font-semibold text-primary">
          Consulter
        </Link>
      </div>
    </Card>
  );
}
