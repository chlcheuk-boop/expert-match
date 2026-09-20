import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { GlobalNav } from "@/components/layout/GlobalNav";
import "./globals.css";

// The logo wordmark is set in Montserrat; the interface follows it.
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Expert Match",
    template: "%s · Expert Match",
  },
  description:
    "Consult experienced industry professionals on the questions that matter to your business.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={montserrat.variable}>
      <body className="min-h-dvh bg-canvas antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-surface focus:px-3 focus:py-2 focus:text-[13px] focus:shadow-raised"
        >
          Skip to content
        </a>
        <GlobalNav />
        <main id="main">{children}</main>
      </body>
    </html>
  );
}
