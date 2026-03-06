/**
 * build.mjs — Scans repo root for single-file pages (.jsx, .html, .svg, .md)
 * and produces a deployable static site in /dist with an auto-generated index.
 *
 * .jsx  → wrapped in HTML shell with React 18 + Babel + Tailwind CDN
 * .html → copied as-is
 * .svg  → copied as-is
 * .md   → wrapped in a minimal HTML shell with GitHub-flavoured rendering
 */

import { readdirSync, readFileSync, writeFileSync, mkdirSync, copyFileSync } from "fs";
import { basename, extname, join } from "path";

// ── Config ──────────────────────────────────────────────────────────────────
const ROOT = ".";
const DIST = "dist";
const PAGE_EXTENSIONS = new Set([".jsx", ".html", ".svg", ".md"]);
const IGNORE = new Set(["index.html", "node_modules", "dist", "build.mjs"]);

// CDN libraries available to .jsx files  (global name → CDN URL)
const CDN_LIBS = {
  react:        { global: "React",    url: "https://cdn.jsdelivr.net/npm/react@18/umd/react.production.min.js" },
  "react-dom":  { global: "ReactDOM", url: "https://cdn.jsdelivr.net/npm/react-dom@18/umd/react-dom.production.min.js" },
  recharts:     { global: "Recharts", url: "https://cdn.jsdelivr.net/npm/recharts@2/umd/Recharts.min.js" },
  lodash:       { global: "_",        url: "https://cdn.jsdelivr.net/npm/lodash@4/lodash.min.js" },
  "lucide-react": { global: "lucideReact", url: "https://cdn.jsdelivr.net/npm/lucide-react@0.263.1/dist/umd/lucide-react.min.js" },
};

// ── Helpers ─────────────────────────────────────────────────────────────────

/** Turn "my-cool-app.jsx" into "My Cool App" */
function prettify(filename) {
  return basename(filename, extname(filename))
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

/**
 * Rewrites `import { x } from "lib"` → `const { x } = window.LibGlobal`
 * and `import x from "lib"` → `const x = window.LibGlobal`
 * so that CDN globals are used instead of bare-module imports.
 */
function rewriteImports(code) {
  return code.replace(
    /import\s+(?:(\{[^}]+\})|(\w+))\s+from\s+["']([^"']+)["'];?/g,
    (_, named, defaultImport, mod) => {
      const lib = CDN_LIBS[mod];
      if (!lib) return `// [skipped] import from "${mod}"`;
      if (named) return `const ${named} = window.${lib.global};`;
      return `const ${defaultImport} = window.${lib.global};`;
    }
  );
}

/** Detect which CDN libs a .jsx file actually uses */
function detectLibs(code) {
  const used = [];
  for (const [mod, info] of Object.entries(CDN_LIBS)) {
    const pattern = new RegExp(`from\\s+["']${mod}["']`);
    if (pattern.test(code)) used.push(info);
  }
  // React is always required for JSX
  if (!used.find((l) => l.global === "React")) used.unshift(CDN_LIBS.react);
  if (!used.find((l) => l.global === "ReactDOM")) used.push(CDN_LIBS["react-dom"]);
  return used;
}

// ── Wrap .jsx → standalone HTML ─────────────────────────────────────────────

function wrapJsx(filename, code) {
  const title = prettify(filename);
  const libs = detectLibs(code);
  const cdnTags = libs.map((l) => `    <script src="${l.url}"><\/script>`).join("\n");
  const transformed = rewriteImports(code)
    .replace(/export\s+default\s+/, "const __DefaultExport__ = ");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
  <script src="https://cdn.tailwindcss.com"><\/script>
${cdnTags}
  <script src="https://cdn.jsdelivr.net/npm/@babel/standalone@7/babel.min.js"><\/script>
  <style>body { margin: 0; font-family: system-ui, -apple-system, sans-serif; }</style>
</head>
<body>
  <div id="root"></div>
  <script type="text/babel" data-type="module">
${transformed}

    ReactDOM.createRoot(document.getElementById("root")).render(
      React.createElement(__DefaultExport__)
    );
  <\/script>
</body>
</html>`;
}

// ── Wrap .md → simple rendered HTML ─────────────────────────────────────────

function wrapMd(filename, content) {
  const title = prettify(filename);
  // Basic markdown rendering via CDN (marked.js)
  const escaped = content.replace(/`/g, "\\`").replace(/\$/g, "\\$");
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
  <script src="https://cdn.jsdelivr.net/npm/marked@12/marked.min.js"><\/script>
  <style>
    body { max-width: 48rem; margin: 2rem auto; padding: 0 1rem; font-family: system-ui, sans-serif; line-height: 1.6; color: #1a1a1a; }
    pre { background: #f5f5f5; padding: 1rem; border-radius: 6px; overflow-x: auto; }
    code { background: #f5f5f5; padding: 0.15em 0.3em; border-radius: 3px; font-size: 0.9em; }
    pre code { background: none; padding: 0; }
    table { border-collapse: collapse; width: 100%; }
    th, td { border: 1px solid #ddd; padding: 0.5rem; text-align: left; }
    th { background: #f5f5f5; }
    img { max-width: 100%; }
    a { color: #2563eb; }
  </style>
</head>
<body>
  <div id="content"></div>
  <script>
    document.getElementById("content").innerHTML = marked.parse(\`${escaped}\`);
  <\/script>
</body>
</html>`;
}

// ── Main ────────────────────────────────────────────────────────────────────

mkdirSync(DIST, { recursive: true });

const files = readdirSync(ROOT).filter((f) => {
  if (IGNORE.has(f) || f.startsWith(".")) return false;
  return PAGE_EXTENSIONS.has(extname(f).toLowerCase());
});

const pages = [];

for (const file of files) {
  const ext = extname(file).toLowerCase();
  const slug = basename(file, ext);
  const outName = ext === ".html" ? file : `${slug}.html`;
  const raw = readFileSync(join(ROOT, file), "utf-8");

  let html;
  switch (ext) {
    case ".jsx":
      html = wrapJsx(file, raw);
      break;
    case ".md":
      html = wrapMd(file, raw);
      break;
    case ".html":
      html = raw;
      break;
    case ".svg":
      copyFileSync(join(ROOT, file), join(DIST, file));
      pages.push({ name: prettify(file), href: file, ext });
      continue;
    default:
      continue;
  }

  writeFileSync(join(DIST, outName), html);
  pages.push({ name: prettify(file), href: outName, ext });
}

// Sort alphabetically
pages.sort((a, b) => a.name.localeCompare(b.name));

// ── Generate index.html ─────────────────────────────────────────────────────

const badges = { ".jsx": "React", ".html": "HTML", ".svg": "SVG", ".md": "Markdown" };
const badgeColors = { ".jsx": "#61dafb", ".html": "#e34c26", ".svg": "#ffb13b", ".md": "#083fa1" };

const cardItems = pages
  .map(
    (p) => `
      <a href="${p.href}" class="card">
        <span class="badge" style="background:${badgeColors[p.ext] || "#888"}">${badges[p.ext] || p.ext}</span>
        <span class="name">${p.name}</span>
        <span class="arrow">→</span>
      </a>`
  )
  .join("\n");

const indexHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Pages</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: system-ui, -apple-system, sans-serif; background: #f8fafc; color: #1e293b; min-height: 100vh; }
    .container { max-width: 40rem; margin: 0 auto; padding: 3rem 1.5rem; }
    h1 { font-size: 1.5rem; font-weight: 700; margin-bottom: 0.25rem; }
    .subtitle { color: #64748b; font-size: 0.875rem; margin-bottom: 2rem; }
    .grid { display: flex; flex-direction: column; gap: 0.5rem; }
    .card {
      display: flex; align-items: center; gap: 0.75rem;
      padding: 0.875rem 1rem; background: #fff; border: 1px solid #e2e8f0;
      border-radius: 8px; text-decoration: none; color: inherit;
      transition: border-color 0.15s, box-shadow 0.15s;
    }
    .card:hover { border-color: #93c5fd; box-shadow: 0 1px 4px rgba(59,130,246,0.1); }
    .badge {
      font-size: 0.65rem; font-weight: 600; color: #fff; padding: 0.15rem 0.5rem;
      border-radius: 4px; text-transform: uppercase; white-space: nowrap;
    }
    .name { flex: 1; font-weight: 500; }
    .arrow { color: #94a3b8; font-size: 1.1rem; }
    .footer { margin-top: 3rem; text-align: center; font-size: 0.75rem; color: #94a3b8; }
  </style>
</head>
<body>
  <div class="container">
    <h1>Pages</h1>
    <p class="subtitle">${pages.length} page${pages.length !== 1 ? "s" : ""} · auto-generated from repo root</p>
    <div class="grid">
${cardItems}
    </div>
    <p class="footer">Built with GitHub Actions</p>
  </div>
</body>
</html>`;

writeFileSync(join(DIST, "index.html"), indexHtml);

console.log(`✓ Built ${pages.length} pages → dist/`);
pages.forEach((p) => console.log(`  ${p.href}  (${badges[p.ext] || p.ext})`));
