import { forwardRef, type TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        "w-full rounded-md border border-ink-border bg-ink-soft px-3 py-2 text-sm text-white placeholder:text-ink-muted focus:border-brand-400 focus:outline-none",
        className
      )}
      {...props}
    />
  )
);

Textarea.displayName = "Textarea";
