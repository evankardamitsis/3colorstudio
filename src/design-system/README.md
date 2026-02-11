# 3colorstudio design system

## Typography

| Role     | Font              | Tailwind class   | Use for                          |
|----------|-------------------|------------------|----------------------------------|
| **heading** | Schnyder* / Libre Baskerville | `font-heading` | Headings (h1, h2, section titles) |
| **body**    | Raleway           | `font-body`     | Body text, UI, nav (default on `<body>`) |

\* **Schnyder** is a commercial typeface from [Commercial Type](https://commercialtype.com/catalog/schnyder). To use it: add `Schnyder-Regular.woff2` to `src/assets/fonts/`, then in `src/design-system/fonts.ts` replace the `fontHeading` export with the `localFont` version (see comment at top of that file).

### Usage

```tsx
<h1 className="font-heading text-4xl">Page title</h1>
<p className="font-body text-base">Body copy.</p>
```

## Tokens

- `src/design-system/fonts.ts` — Next.js font loading and CSS variables.
- `src/design-system/tokens.ts` — Token reference; extend with colors/spacing when you add them from Figma.
