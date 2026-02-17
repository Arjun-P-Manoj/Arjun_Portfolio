import type { Metadata } from "next";
import "./globals.css";
import { AppProvider } from "@/components/providers/app-provider";

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),
  title: {
    default: "Arjun P Manoj | Full Stack Developer",
    template: "%s | Arjun P Manoj"
  },
  description:
    "Professional full stack developer portfolio built with Next.js, TypeScript, Prisma and MongoDB."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
