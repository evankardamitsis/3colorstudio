# 3colorstudio design system

## Typography

| Role     | Font            | Tailwind class   | Use for                    |
|----------|-----------------|------------------|----------------------------|
| **heading** | Staatliches   | `font-heading`   | Headings (h1, h2, section titles) |
| **body**    | Inter         | `font-body`     | Body text, UI, nav (default on `<body>`) |
| **accent**  | Reenie Beanie | `font-accent`   | Decorative / handwritten accents |
| **display** | Krona One     | `font-display`  | Display / impact headlines |

### Usage

```tsx
<h1 className="font-heading text-4xl">Page title</h1>
<p className="font-body text-base">Body copy.</p>
<span className="font-accent text-2xl">Handwritten note</span>
<h2 className="font-display text-3xl">Impact subhead</h2>
```

Staatliches and Reenie Beanie have a single weight (400). Inter is variable. Krona One has a single weight.

## Tokens

- `src/design-system/fonts.ts` — Next.js font loading and CSS variables.
- `src/design-system/tokens.ts` — Token reference (fonts); extend with colors/spacing when you add them from Figma.
