import Link from "next/link";
import { ThemeToggle } from "@/components/public/theme-toggle";

export function SiteFooter() {
  return (
    <footer className="pointer-events-none fixed inset-x-0 bottom-3 z-40 sm:bottom-6">
      <div className="container-shell flex justify-center">
        <div className="pointer-events-auto surface-card flex max-w-full items-center gap-0.5 overflow-x-auto rounded-full px-2 py-1.5 sm:gap-1 sm:px-4 sm:py-2">
          <Link href="/" className="rounded-full px-3 py-2 text-xs text-muted-foreground hover:text-foreground sm:px-4 sm:text-sm">
            Home
          </Link>
          <Link href="/#projects" className="rounded-full px-3 py-2 text-xs text-muted-foreground hover:text-foreground sm:px-4 sm:text-sm">
            Work
          </Link>
          <Link href="/#experience" className="rounded-full px-3 py-2 text-xs text-muted-foreground hover:text-foreground sm:px-4 sm:text-sm">
            Experience
          </Link>
          <Link href="/#contact" className="rounded-full px-3 py-2 text-xs text-muted-foreground hover:text-foreground sm:px-4 sm:text-sm">
            Contact
          </Link>
          <Link href="/#contact" className="rounded-full bg-primary px-3 py-2 text-xs text-background sm:px-4 sm:text-sm">
            Book Call
          </Link>
          <div className="ml-0.5 hidden rounded-full border border-border p-1 sm:ml-1 sm:block">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </footer>
  );
}
