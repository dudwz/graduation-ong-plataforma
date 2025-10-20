const fs = require('fs');
const path = require('path');

const dist = path.resolve(__dirname, '..', 'dist');

const pages = [
  { file: 'index.html', bundle: 'index.js' },
  { file: 'projetos.html', bundle: 'projetos.js' },
  { file: 'cadastro.html', bundle: 'cadastro.js' },
];

for (const { file, bundle } of pages) {
  const p = path.join(dist, file);
  if (!fs.existsSync(p)) {
    console.warn(`[patch-html] Skipping missing ${file}`);
    continue;
  }
  let html = fs.readFileSync(p, 'utf8');

  html = html.replace(/<script[^>]*type="module"[^>]*><\/script>\s*/g, '');
  html = html.replace(/<script[^>]*type="module"[^>]*src=[^>]*><\/script>\s*/g, '');

  html = html.replace(/<script[^>]*src="\.?\/?js\/main\.js"[^>]*><\/script>\s*/g, '');

  const scriptTag = `  <script src="./assets/${bundle}" defer></script>\n`;
  if (/<\/head>/.test(html)) {
    html = html.replace(/<\/head>/, `${scriptTag}</head>`);
  } else if (/<\/body>/.test(html)) {
    html = html.replace(/<\/body>/, `${scriptTag}</body>`);
  } else {
    html += `\n${scriptTag}`;
  }

  fs.writeFileSync(p, html);
  console.log(`[patch-html] Patched ${file} -> assets/${bundle}`);
}
