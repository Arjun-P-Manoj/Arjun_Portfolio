import { InputHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "w-full rounded-2xl border border-border bg-card px-4 py-3 text-base outline-none ring-0 transition focus:border-foreground/30 focus:bg-background",
        className
      )}
      {...props}
    />
  )
);

Input.displayName = "Input";
