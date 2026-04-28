import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={`group border-foreground/10 bg-background/70 hover:border-accent/35 dark:hover:border-accent/65 relative overflow-hidden rounded-[2rem] border p-6 shadow-[0_1px_0_rgba(255,255,255,0.5)_inset,0_22px_70px_rgba(0,0,0,0.07)] backdrop-blur-sm transition-[border-color,box-shadow] duration-200 ease-out hover:shadow-[0_24px_80px_rgba(0,0,0,0.09)] dark:hover:shadow-[0_24px_80px_rgba(0,0,0,0.28)] ${className}`}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,color-mix(in_oklch,var(--accent)_18%,transparent),transparent_34%),linear-gradient(135deg,rgba(255,255,255,0.28),transparent_42%)] opacity-70" />
      <div className="relative">{children}</div>
    </div>
  );
}
