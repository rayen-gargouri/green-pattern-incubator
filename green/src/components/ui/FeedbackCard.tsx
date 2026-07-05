import { MessageSquareText } from "lucide-react";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/status-badge";

export function FeedbackCard({
  title,
  author,
  content,
  status = "recent"
}: {
  title: string;
  author: string;
  content: string;
  status?: string;
}) {
  return (
    <Card>
      <div className="mb-3 flex items-start justify-between gap-3">
        <MessageSquareText className="h-5 w-5 text-primary" />
        <StatusBadge label={status} tone="blue" />
      </div>
      <CardTitle>{title}</CardTitle>
      <CardDescription className="mt-1">{author}</CardDescription>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">{content}</p>
    </Card>
  );
}
