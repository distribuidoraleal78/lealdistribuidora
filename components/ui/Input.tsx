import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "h-10 w-full rounded-md border border-ink-border bg-ink-soft px-3 text-sm text-white placeholder:text-ink-muted focus:border-brand-400 focus:outline-none",
        className
      )}
      {...props}
    />
  )
);

Input.displayName = "Input";
