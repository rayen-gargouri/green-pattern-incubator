export function ProgressBar({ value }: { value: number }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium">Progression</span>
        <span className="text-muted-foreground">{value}%</span>
      </div>
      <div className="h-2.5 rounded-full bg-muted">
        <div className="h-2.5 rounded-full bg-primary" style={{ width: `${Math.min(value, 100)}%` }} />
      </div>
    </div>
  );
}
