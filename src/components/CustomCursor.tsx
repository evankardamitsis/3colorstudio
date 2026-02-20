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

  const size = 32;
  const half = size / 2;

  return (
    <div
      className="pointer-events-none fixed hidden md:block"
      aria-hidden
      style={{
        left: position.x - half,
        top: position.y - half,
        width: size,
        height: size,
        zIndex: 99999,
      }}
    >
      <div
        className="h-full w-full rounded-full border border-white/30"
        style={{
          background: "transparent",
          backdropFilter: "invert(1)",
          WebkitBackdropFilter: "invert(1)",
        }}
      />
    </div>
  );
}
