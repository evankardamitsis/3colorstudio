"use client";

import { useEffect, useState } from "react";

export function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [visible, setVisible] = useState(false);
  const [overLink, setOverLink] = useState(false);

  useEffect(() => {
    const isTouchDevice = () =>
      "ontouchstart" in window || navigator.maxTouchPoints > 0;

    if (isTouchDevice()) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!visible) setVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[role='button']") ||
        target.closest("input") ||
        target.closest("select") ||
        target.closest("textarea")
      ) {
        setOverLink(true);
      } else {
        setOverLink(false);
      }
    };

    const handleMouseLeave = () => setVisible(false);

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOver);
    document.body.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOver);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [visible]);

  if (!visible || overLink) return null;

  return (
    <div
      className="pointer-events-none fixed left-0 top-0 z-9999 hidden md:block"
      aria-hidden
      style={{
        transform: `translate(${position.x}px, ${position.y}px) translate(-50%, -50%)`,
      }}
    >
      <div
        className="h-8 w-8 rounded-full bg-cream opacity-60"
        style={{ mixBlendMode: "difference" }}
      />
    </div>
  );
}
