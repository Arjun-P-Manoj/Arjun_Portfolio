import type { Metadata } from "next";
import "./globals.css";
import { AppProvider } from "@/components/providers/app-provider";

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),
  icons: {
    icon: "/uploads/images/logo_arjun_favicon_circle.png",
    shortcut: "/uploads/images/logo_arjun_favicon_circle.png",
    apple: "/uploads/images/logo_arjun_favicon_circle.png",
  },
  title: {
    default: "Arjun P Manoj |Full Stack Dev & AWS Cloud Enthusiast",
    template: "%s | Arjun P Manoj",
  },
  description:
    "AWS Cloud Enthusiast and Full Stack Developer crafting scalable web applications.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
