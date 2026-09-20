import type { SVGProps } from "react";

/**
 * Small stroke icon set. Icons are decorative by default — every one is
 * paired with a text label or an aria-label on its control.
 */
function Icon({ children, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

export const ChevronDownIcon = (props: SVGProps<SVGSVGElement>) => (
  <Icon {...props}>
    <path d="M4 6.5 8 10.5 12 6.5" />
  </Icon>
);

export const CheckIcon = (props: SVGProps<SVGSVGElement>) => (
  <Icon {...props}>
    <path d="M3.5 8.5 6.5 11.5 12.5 4.5" />
  </Icon>
);

export const SearchIcon = (props: SVGProps<SVGSVGElement>) => (
  <Icon {...props}>
    <circle cx="7.25" cy="7.25" r="4.25" />
    <path d="m10.5 10.5 3 3" />
  </Icon>
);

export const CloseIcon = (props: SVGProps<SVGSVGElement>) => (
  <Icon {...props}>
    <path d="m4 4 8 8M12 4l-8 8" />
  </Icon>
);

export const PlusIcon = (props: SVGProps<SVGSVGElement>) => (
  <Icon {...props}>
    <path d="M8 3.5v9M3.5 8h9" />
  </Icon>
);

export const ArrowRightIcon = (props: SVGProps<SVGSVGElement>) => (
  <Icon {...props}>
    <path d="M3 8h9.5M9 4.5 12.5 8 9 11.5" />
  </Icon>
);

export const SlidersIcon = (props: SVGProps<SVGSVGElement>) => (
  <Icon {...props}>
    <path d="M2.5 5h7M12 5h1.5M2.5 11h1.5M6.5 11h7" />
    <circle cx="10.75" cy="5" r="1.5" />
    <circle cx="5.25" cy="11" r="1.5" />
  </Icon>
);

export const ArchiveIcon = (props: SVGProps<SVGSVGElement>) => (
  <Icon {...props}>
    <rect x="2.5" y="3" width="11" height="3" rx="1" />
    <path d="M3.5 6v6a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1V6" />
    <path d="M6.5 9h3" />
  </Icon>
);

export const MenuIcon = (props: SVGProps<SVGSVGElement>) => (
  <Icon {...props}>
    <path d="M2.5 4.5h11M2.5 8h11M2.5 11.5h11" />
  </Icon>
);

export const ChevronLeftIcon = (props: SVGProps<SVGSVGElement>) => (
  <Icon {...props}>
    <path d="M9.5 3.5 5.5 8l4 4.5" />
  </Icon>
);

export const ChevronRightIcon = (props: SVGProps<SVGSVGElement>) => (
  <Icon {...props}>
    <path d="M6.5 3.5 10.5 8l-4 4.5" />
  </Icon>
);
