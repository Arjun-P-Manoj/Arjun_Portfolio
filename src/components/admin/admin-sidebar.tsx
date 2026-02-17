import Link from "next/link";
import {
  LayoutDashboard,
  Briefcase,
  Trophy,
  GraduationCap,
  NotebookText,
  Sparkles,
  User,
  Clock3
} from "lucide-react";
import { logoutAction } from "@/actions/auth";

const links = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/projects", label: "Projects", icon: Briefcase },
  { href: "/admin/achievements", label: "Achievements", icon: Trophy },
  { href: "/admin/education", label: "Education", icon: GraduationCap },
  { href: "/admin/experience", label: "Experience", icon: Clock3 },
  { href: "/admin/blog", label: "Blog", icon: NotebookText },
  { href: "/admin/skills", label: "Skills", icon: Sparkles },
  { href: "/admin/profile", label: "Profile", icon: User }
];

export function AdminSidebar() {
  return (
    <aside className="w-full border-r border-border bg-card md:w-64">
      <div className="px-4 py-5">
        <p className="text-sm text-muted-foreground">Admin Panel</p>
        <h2 className="text-lg font-semibold">Arjun Portfolio</h2>
      </div>
      <nav className="space-y-1 px-3 pb-4">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-muted"
            >
              <Icon className="h-4 w-4" />
              {link.label}
            </Link>
          );
        })}
      </nav>
      <form action={logoutAction} className="px-3 pb-5">
        <button className="w-full rounded-md border border-border px-3 py-2 text-left text-sm">
          Sign out
        </button>
      </form>
    </aside>
  );
}
