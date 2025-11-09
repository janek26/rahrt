import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={`group border-border/50 from-card/50 to-card/30 hover:from-card hover:to-card/50 hover:border-accent/50 hover:shadow-accent/10 rounded-lg border bg-linear-to-br p-6 ${className}`}
    >
      {children}
    </div>
  );
}
