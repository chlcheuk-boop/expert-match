"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";

export interface SectionTab {
  label: string;
  href: string;
}

export interface SectionTabsProps {
  tabs: SectionTab[];
  /** Names the tab set for assistive technology, e.g. "Expert Match sections". */
  ariaLabel: string;
}

/** Secondary navigation within a top-level area. */
export function SectionTabs({ tabs, ariaLabel }: SectionTabsProps) {
  const pathname = usePathname();

  return (
    <div className="border-b border-line">
      <nav aria-label={ariaLabel}>
        <ul className="-mb-px flex items-center gap-6 overflow-x-auto">
          {tabs.map((tab) => {
            const isActive = pathname === tab.href;
            return (
              <li key={tab.href}>
                <Link
                  href={tab.href}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "inline-flex h-10 items-center border-b-2 text-[13.5px] whitespace-nowrap",
                    "transition-colors duration-150",
                    isActive
                      ? "border-accent font-medium text-ink"
                      : "border-transparent text-ink-secondary hover:border-line-strong hover:text-ink",
                  )}
                >
                  {tab.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
