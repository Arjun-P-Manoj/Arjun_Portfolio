import { TextareaHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export const Textarea = forwardRef<
  HTMLTextAreaElement,
  TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      "w-full rounded-2xl border border-border bg-card px-4 py-3 text-base outline-none transition focus:border-foreground/30 focus:bg-background",
      className
    )}
    {...props}
  />
));

Textarea.displayName = "Textarea";
