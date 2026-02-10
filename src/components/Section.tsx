import type { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  className?: string;
  /** Optional wrapper element (default: section) */
  as?: "section" | "div" | "aside";
  /** Optional id for anchor links */
  id?: string;
}

export function Section({
  children,
  className = "",
  as: Component = "section",
  id,
}: SectionProps) {
  return (
    <Component
      id={id}
      className={`py-16 md:py-24 lg:py-28 ${className}`.trim()}
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
        {children}
      </div>
    </Component>
  );
}
