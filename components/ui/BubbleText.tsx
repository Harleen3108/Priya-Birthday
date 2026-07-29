import { ReactNode } from "react";

interface BubbleTextProps {
  children: ReactNode;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  size?: "sm" | "md" | "lg" | "xl" | "hero";
}

const sizeClasses = {
  sm: "text-2xl md:text-3xl",
  md: "text-3xl md:text-4xl",
  lg: "text-4xl md:text-5xl lg:text-6xl",
  xl: "text-5xl md:text-6xl lg:text-7xl",
  hero: "text-6xl md:text-7xl lg:text-8xl xl:text-9xl",
};

export function BubbleText({
  children,
  as: Tag = "h2",
  className = "",
  size = "lg",
}: BubbleTextProps) {
  return (
    <Tag
      className={`font-display font-bold leading-none tracking-tight bubble-text ${sizeClasses[size]} ${className}`}
    >
      {children}
    </Tag>
  );
}

interface PillBadgeProps {
  children: ReactNode;
  variant?: "pink" | "cream" | "outline";
  className?: string;
}

export function PillBadge({ children, variant = "pink", className = "" }: PillBadgeProps) {
  const variants = {
    pink: "bg-hot-pink text-white",
    cream: "bg-cream text-black border border-black/10",
    outline: "bg-transparent text-black border-2 border-black",
  };

  return (
    <span
      className={`inline-block rounded-full px-4 py-1.5 text-sm font-medium font-body ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}

interface SlideCardProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export function SlideCard({ children, className = "", id }: SlideCardProps) {
  return (
    <section
      id={id}
      className={`relative mx-auto w-full max-w-5xl overflow-hidden rounded-3xl bg-cream p-6 shadow-card md:p-10 lg:p-12 ${className}`}
    >
      {children}
    </section>
  );
}
