import { TAG_CLASSES, TAG_CLASSES_SM } from "@/lib/styles";

interface TagProps {
  children: React.ReactNode;
  variant?: "default" | "small";
  className?: string;
}

export function Tag({
  children,
  variant = "default",
  className = "",
}: TagProps) {
  const baseClasses = variant === "small" ? TAG_CLASSES_SM : TAG_CLASSES;

  return <span className={`${baseClasses} ${className}`}>{children}</span>;
}
