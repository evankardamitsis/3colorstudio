import { RichTextRenderer } from "./RichTextRenderer";
import type { PageTextBlock } from "@/types/app";

interface TextBlockProps {
  block: PageTextBlock;
  className?: string;
  /** If true, render heading as a large display style */
  headingSize?: "default" | "large";
}

export function TextBlock({
  block,
  className = "",
  headingSize = "default",
}: TextBlockProps) {
  const headingClass =
    headingSize === "large"
      ? "font-heading text-3xl md:text-4xl lg:text-5xl font-normal tracking-tight text-neutral-900 dark:text-neutral-100"
      : "font-heading text-2xl md:text-3xl font-normal text-neutral-800 dark:text-neutral-200 mb-4";

  return (
    <div className={className}>
      {block.heading ? (
        <h2 className={headingClass}>{block.heading}</h2>
      ) : null}
      {block.body != null ? (
        typeof block.body === "string" ? (
          <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed whitespace-pre-wrap">
            {block.body}
          </p>
        ) : (
          <RichTextRenderer content={block.body} className="text-neutral-600 dark:text-neutral-400" />
        )
      ) : null}
    </div>
  );
}
