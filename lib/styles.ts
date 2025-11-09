// Common style classes
export const SECTION_CLASSES = "py-20 px-6";
export const CONTAINER_CLASSES = "max-w-6xl mx-auto";
export const CONTAINER_CLASSES_MD = "max-w-4xl mx-auto";

// Heading styles
export const SECTION_HEADING_CLASSES =
  "text-4xl md:text-5xl font-bold mb-4 tracking-tight";
export const DISPLAY_FONT_STYLE = {
  fontFamily: "var(--font-display)",
} as const;

// Tag/Badge styles
export const TAG_CLASSES =
  "px-3 py-1 rounded-full text-xs bg-accent/10 text-accent/80 font-medium border border-accent/30 hover:bg-accent/20 hover:border-accent/50 cursor-default";

export const TAG_CLASSES_SM =
  "px-3 py-1 rounded-full text-sm bg-accent/10 text-accent font-medium border border-accent/30 hover:bg-accent/20 hover:border-accent/50 cursor-default";

// Icon link styles
export const ICON_LINK_CLASSES = "p-2 rounded-lg hover:bg-accent/10 group";

export const ICON_LINK_CLASSES_SECONDARY =
  "p-2 rounded-lg hover:bg-secondary/50 group/link";

export const ICON_LINK_CLASSES_ACCENT =
  "p-2 rounded-lg hover:bg-accent/20 group/link";

// Button styles
export const BUTTON_PRIMARY_CLASSES =
  "inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-primary to-accent text-white font-semibold hover:shadow-xl hover:shadow-primary/25 group";

export const BUTTON_SECONDARY_CLASSES =
  "inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-foreground/20 hover:bg-foreground/5 hover:border-foreground/30 font-semibold";
