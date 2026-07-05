"use client";

import type { FieldError, UseFormRegisterReturn } from "react-hook-form";
import { cn } from "@/lib/utils";

type BaseProps = {
  label: string;
  error?: FieldError;
  className?: string;
};

type InputProps = BaseProps &
  React.InputHTMLAttributes<HTMLInputElement> & {
    registration: UseFormRegisterReturn;
  };

type TextareaProps = BaseProps &
  React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
    registration: UseFormRegisterReturn;
  };

type SelectProps = BaseProps &
  React.SelectHTMLAttributes<HTMLSelectElement> & {
    registration: UseFormRegisterReturn;
    options: string[];
  };

export function FormInput({ label, error, className, registration, ...props }: InputProps) {
  return (
    <label className={cn("grid gap-2 text-sm font-medium", className)}>
      {label}
      <input className="h-11 rounded-md border bg-white px-3 text-sm font-normal" {...registration} {...props} />
      {error ? <span className="text-xs font-normal text-red-600">{error.message}</span> : null}
    </label>
  );
}

export function FormTextarea({ label, error, className, registration, ...props }: TextareaProps) {
  return (
    <label className={cn("grid gap-2 text-sm font-medium", className)}>
      {label}
      <textarea className="min-h-28 rounded-md border bg-white px-3 py-2 text-sm font-normal" {...registration} {...props} />
      {error ? <span className="text-xs font-normal text-red-600">{error.message}</span> : null}
    </label>
  );
}

export function FormSelect({ label, error, className, registration, options, ...props }: SelectProps) {
  return (
    <label className={cn("grid gap-2 text-sm font-medium", className)}>
      {label}
      <select className="h-11 rounded-md border bg-white px-3 text-sm font-normal capitalize" {...registration} {...props}>
        <option value="">Selectionner</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {error ? <span className="text-xs font-normal text-red-600">{error.message}</span> : null}
    </label>
  );
}
