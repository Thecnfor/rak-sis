"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type AnimationType = "fade-up" | "fade-in" | "fade-left" | "fade-right";

type Props = {
  children: ReactNode;
  animation?: AnimationType;
  delay?: number;
  threshold?: number;
  className?: string;
};

export default function ScrollReveal({
  children,
  animation = "fade-up",
  delay = 0,
  threshold = 0.1,
  className = "",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // 尊重用户的“减少动态效果”偏好，此时直接展示内容。
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      {
        threshold,
        rootMargin: "0px 0px -40px 0px",
      },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  const variantClass =
    animation === "fade-up"
      ? "reveal--fade-up"
      : animation === "fade-in"
        ? "reveal--fade-in"
        : animation === "fade-left"
          ? "reveal--fade-left"
          : "reveal--fade-right";

  const baseClass = visible ? `reveal revealed ${variantClass}` : `reveal ${variantClass}`;
  const mergedClass = className ? `${baseClass} ${className}` : baseClass;

  return (
    <div
      ref={ref}
      className={mergedClass}
      style={delay > 0 ? { animationDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
