"use client";

import { motion } from "framer-motion";

export function ProgressBar({ value }: { value: number }) {
  const safeValue = Math.min(Math.max(value, 0), 100);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="font-semibold text-foreground">Progression</span>
        <span className="text-muted-foreground font-medium">{safeValue}%</span>
      </div>
      <div className="h-3 w-full rounded-full bg-muted overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-primary"
          initial={{ width: 0 }}
          animate={{ width: `${safeValue}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}
