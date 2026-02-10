"use client";

import type { RichTextContent } from "@/types/app";

interface RichTextRendererProps {
  content: RichTextContent | string | null;
  className?: string;
}

/**
 * Renders Contentful rich text (JSON) or plain string.
 * For full rich text (headings, lists, links) you could use @contentful/rich-text-react-renderer;
 * here we keep it dependency-free and render JSON as simple HTML or fallback to plain text.
 */
export function RichTextRenderer({ content, className = "" }: RichTextRendererProps) {
  if (content == null) return null;

  if (typeof content === "string") {
    return (
      <div
        className={`prose prose-neutral dark:prose-invert max-w-none ${className}`.trim()}
        dangerouslySetInnerHTML={{ __html: content.replace(/\n/g, "<br />") }}
      />
    );
  }

  if (content.type === "plain") {
    return (
      <div
        className={`prose prose-neutral dark:prose-invert max-w-none ${className}`.trim()}
      >
        <p className="whitespace-pre-wrap">{content.text}</p>
      </div>
    );
  }

  // type === "richtext" with json: render a minimal document (Contentful rich text JSON structure)
  const doc = content.json as { nodeType?: string; content?: Array<{ nodeType?: string; value?: string; content?: Array<{ value?: string }> }> };
  if (!doc?.content) return null;

  const blocks = doc.content.map((node, i) => {
    if (node.nodeType === "paragraph" && node.content) {
      const text = node.content.map((c) => c.value ?? "").join("");
      return <p key={i} className="mb-4 last:mb-0">{text}</p>;
    }
    if (node.nodeType === "heading-2" && node.content) {
      const text = node.content.map((c) => c.value ?? "").join("");
      return <h2 key={i} className="text-xl font-semibold mt-6 mb-2">{text}</h2>;
    }
    if (node.nodeType === "heading-3" && node.content) {
      const text = node.content.map((c) => c.value ?? "").join("");
      return <h3 key={i} className="text-lg font-semibold mt-4 mb-2">{text}</h3>;
    }
    return null;
  }).filter(Boolean);

  return (
    <div className={`prose prose-neutral dark:prose-invert max-w-none ${className}`.trim()}>
      {blocks}
    </div>
  );
}
