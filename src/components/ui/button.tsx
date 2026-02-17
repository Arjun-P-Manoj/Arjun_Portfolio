import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "outline" | "ghost";
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center rounded-full px-6 py-3 text-base font-medium transition disabled:opacity-60",
        variant === "default" && "bg-primary text-background hover:opacity-90",
        variant === "outline" && "border border-border bg-card hover:bg-muted",
        variant === "ghost" && "hover:bg-muted",
        className
      )}
      {...props}
    />
  )
);

Button.displayName = "Button";
