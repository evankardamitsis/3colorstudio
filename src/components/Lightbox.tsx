"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

interface LightboxItem {
  src: string;
  alt: string;
  type?: "image" | "video";
}

interface LightboxProps {
  isOpen: boolean;
  items: LightboxItem[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export function Lightbox({
  isOpen,
  items,
  currentIndex,
  onClose,
  onNavigate,
}: LightboxProps) {
  const lightboxRef = useRef<HTMLDivElement>(null);
  const currentItem = items[currentIndex];

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    const handleArrowKeys = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        const prevIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
        onNavigate(prevIndex);
      } else if (e.key === "ArrowRight") {
        const nextIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
        onNavigate(nextIndex);
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.addEventListener("keydown", handleArrowKeys);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("keydown", handleArrowKeys);
      document.body.style.overflow = "";
    };
  }, [isOpen, currentIndex, items.length, onClose, onNavigate]);

  if (!isOpen || !currentItem) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === lightboxRef.current) {
      onClose();
    }
  };

  const goToPrevious = () => {
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
    onNavigate(prevIndex);
  };

  const goToNext = () => {
    const nextIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
    onNavigate(nextIndex);
  };

  const isVideo = currentItem.type === "video" || currentItem.src.endsWith(".mp4") || currentItem.src.endsWith(".webm");

  return (
    <div
      ref={lightboxRef}
      className="fixed inset-0 z-200 flex items-center justify-center bg-black/95 backdrop-blur-sm transition-opacity duration-300"
      style={{
        opacity: isOpen ? 1 : 0,
        pointerEvents: isOpen ? "auto" : "none",
      }}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-label="Lightbox gallery"
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-all duration-200 hover:bg-white/20 hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
        aria-label="Close lightbox"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>

      {/* Navigation arrows */}
      {items.length > 1 && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              goToPrevious();
            }}
            className="absolute left-6 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-all duration-200 hover:bg-white/20 hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            aria-label="Previous image"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              goToNext();
            }}
            className="absolute right-6 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-all duration-200 hover:bg-white/20 hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            aria-label="Next image"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {/* Image/Video content */}
      <div className="relative mx-auto max-h-[90vh] max-w-[90vw] animate-[fadeIn_0.3s_ease-out]">
        {isVideo ? (
          <video
            src={currentItem.src}
            controls
            autoPlay
            className="max-h-[90vh] max-w-[90vw] object-contain"
            aria-label={currentItem.alt}
          />
        ) : (
          <Image
            src={currentItem.src}
            alt={currentItem.alt}
            width={1920}
            height={1080}
            className="max-h-[90vh] max-w-[90vw] object-contain"
            unoptimized={currentItem.src.startsWith("https://placehold.co")}
            priority
          />
        )}
      </div>

      {/* Image counter */}
      {items.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-4 py-2 text-sm text-white backdrop-blur-sm">
          {currentIndex + 1} / {items.length}
        </div>
      )}
    </div>
  );
}
