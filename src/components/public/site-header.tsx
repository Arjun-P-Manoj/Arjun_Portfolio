import { MapPin } from "lucide-react";
import { ThemeToggle } from "@/components/public/theme-toggle";

export function SiteHeader() {
  return (
    <header className="container-shell relative z-20 pt-2">
      <div className="mx-auto flex max-w-4xl items-center justify-between gap-3">
        <div className="surface-card animate-in px-4 py-2 text-sm font-medium">@arjunpmanoj</div>
        <div className="flex items-center gap-3">
          <div className="surface-card animate-in delay-1 flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Open to work
          </div>
          <div className="surface-card animate-in delay-2 p-1">
            <ThemeToggle />
          </div>
        </div>
      </div>
      <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground md:ml-4">
        <MapPin className="h-4 w-4" />
        Thrissur, Kerala
      </div>
    </header>
  );
}
