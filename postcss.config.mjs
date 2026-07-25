// Tailwind was removed. The project ships only BEM class names and never
// references any utility classes. With no transforms needed, an empty
// PostCSS config is the simplest correct value (Next.js is happy with
// none of these — we keep this file as documentation that the previous
// `@tailwindcss/postcss` plugin has been deliberately removed).
const config = {};
export default config;
