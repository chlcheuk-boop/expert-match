"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import { CloseIcon, MenuIcon } from "@/components/ui/icons";

const NAV_ITEMS = [
  { label: "Overview", href: "/overview" },
  { label: "Your Expert Match", href: "/expert-match/requests" },
  { label: "Results", href: "/results/requests" },
  { label: "Research", href: "/research" },
  { label: "Billing", href: "/billing" },
];

function isSectionActive(pathname: string, href: string) {
  const section = href.split("/").slice(0, 2).join("/");
  return pathname === section || pathname.startsWith(`${section}/`);
}

/** Application-level navigation, present on every page. */
export function GlobalNav() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = React.useState(false);

  React.useEffect(() => setMenuOpen(false), [pathname]);

  return (
    <header className="sticky top-0 z-30 border-b border-line bg-surface/85 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-[1180px] items-center gap-3 px-5 sm:px-6 lg:gap-6 lg:px-8">
        <Link
          href="/expert-match/requests"
          className="
            flex shrink-0 items-center gap-2 rounded-xs text-[13.5px] font-semibold
            whitespace-nowrap tracking-[-0.01em] text-ink lg:gap-2.5 lg:text-[14.5px]
          "
        >
          <span
            aria-hidden="true"
            className="inline-flex size-6 items-center justify-center rounded-[5px] bg-accent text-[11px] font-semibold text-white"
          >
            E
          </span>
          Expert Match
        </Link>

        <nav aria-label="Main" className="hidden shrink-0 md:block">
          <ul className="flex items-center gap-0.5 lg:gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive = isSectionActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "inline-flex h-8 shrink-0 items-center rounded-sm px-2 text-[12.5px]",
                      "whitespace-nowrap transition-colors duration-150 lg:px-2.5 lg:text-[13.5px]",
                      isActive
                        ? "font-medium text-ink"
                        : "text-ink-secondary hover:bg-surface-sunken hover:text-ink",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="ml-auto flex shrink-0 items-center gap-2.5 lg:gap-3">
          <span className="hidden text-[12.5px] whitespace-nowrap text-ink-secondary sm:inline lg:text-[13px]">
            Kendall Rowe
          </span>
          <span
            aria-hidden="true"
            className="inline-flex size-7 items-center justify-center rounded-full border border-line bg-surface-sunken text-[11px] font-medium text-ink-secondary"
          >
            KR
          </span>

          <button
            type="button"
            aria-expanded={menuOpen}
            aria-controls="global-nav-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((open) => !open)}
            className="
              -mr-1.5 inline-flex size-8 items-center justify-center rounded-sm text-ink-secondary
              transition-colors duration-150 hover:bg-surface-sunken hover:text-ink md:hidden
            "
          >
            {menuOpen ? <CloseIcon className="size-4" /> : <MenuIcon className="size-4" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav
          id="global-nav-menu"
          aria-label="Main"
          className="border-t border-line bg-surface px-3 py-2 md:hidden"
        >
          <ul>
            {NAV_ITEMS.map((item) => {
              const isActive = isSectionActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "flex h-10 items-center rounded-sm px-2.5 text-[14px]",
                      isActive ? "bg-surface-sunken font-medium text-ink" : "text-ink-secondary",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </header>
  );
}
