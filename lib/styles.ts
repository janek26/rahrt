// Common style classes
export const SECTION_CLASSES = "px-5 py-20 sm:px-6";
export const CONTAINER_CLASSES = "max-w-7xl mx-auto";
export const CONTAINER_CLASSES_MD = "max-w-7xl mx-auto";

// Heading styles
export const SECTION_HEADING_CLASSES =
  "mb-4 max-w-3xl text-5xl font-medium leading-[0.95] tracking-[-0.06em] md:text-7xl";
export const DISPLAY_FONT_STYLE = {
  fontFamily: "var(--font-display)",
} as const;

// Tag/Badge styles
export const TAG_CLASSES =
  "cursor-default rounded-full border border-foreground/[0.15] bg-background/70 px-3 py-1 font-mono text-[0.68rem] font-medium uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:border-accent/50 hover:bg-accent/[0.07] hover:text-foreground dark:hover:border-accent/75 dark:hover:bg-accent/[0.2] dark:hover:text-foreground";

export const TAG_CLASSES_SM =
  "cursor-default rounded-full border border-foreground/[0.15] bg-background/70 px-3 py-1 font-mono text-[0.68rem] font-medium uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:border-accent/50 hover:bg-accent/[0.07] hover:text-foreground dark:hover:border-accent/75 dark:hover:bg-accent/[0.2] dark:hover:text-foreground";

// Icon link styles
export const ICON_LINK_CLASSES =
  "group rounded-full border border-foreground/10 bg-background/[0.55] p-2 transition-colors duration-200 ease-out hover:border-accent/45 hover:bg-accent/[0.1] dark:hover:border-accent/75 dark:hover:bg-accent/[0.22]";

export const ICON_LINK_CLASSES_SECONDARY =
  "group rounded-full border border-foreground/10 bg-background/[0.55] p-2 transition-colors duration-200 ease-out hover:border-foreground/25 hover:bg-secondary/60 dark:hover:border-accent/70 dark:hover:bg-accent/[0.2]";

export const ICON_LINK_CLASSES_ACCENT =
  "group rounded-full border border-foreground/10 bg-background/[0.55] p-2 transition-colors duration-200 ease-out hover:border-accent/45 hover:bg-accent/[0.12] dark:hover:border-accent/75 dark:hover:bg-accent/[0.22]";

// Button styles
export const BUTTON_PRIMARY_CLASSES =
  "group inline-flex items-center gap-3 rounded-full border border-foreground bg-foreground px-5 py-3 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-background shadow-[0_10px_30px_rgba(0,0,0,0.12)] transition-[transform,border-color,box-shadow,background-color] duration-[160ms] ease-out active:scale-[0.97] hover:border-accent hover:bg-accent hover:text-accent-foreground hover:shadow-[0_16px_44px_rgba(0,0,0,0.18)] dark:hover:border-accent dark:hover:bg-accent dark:hover:text-accent-foreground";

export const BUTTON_SECONDARY_CLASSES =
  "inline-flex items-center gap-3 rounded-full border border-foreground/20 bg-background/80 px-5 py-3 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-foreground transition-[transform,border-color,background-color,color] duration-[160ms] ease-out active:scale-[0.97] hover:border-accent/50 hover:bg-accent/[0.08] hover:text-foreground dark:hover:border-accent/75 dark:hover:bg-accent/[0.22]";
