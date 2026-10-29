import assert from 'node:assert/strict';
import {existsSync, readFileSync, readdirSync, statSync} from 'node:fs';
import {resolve, dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const out = join(root, 'out');
const config = JSON.parse(readFileSync(join(root, 'wrangler.jsonc'), 'utf8'));
assert.equal(config.pages_build_output_dir, './out', 'Pages precisa publicar out, não .next.');
assert(!config.main && !config.assets, 'Esta configuração é de Pages, não de Workers.');
for (const name of ['index.html', '404.html', 'robots.txt', 'sitemap.xml', 'ads.txt', '_headers']) {
  assert(existsSync(join(out, name)), `Exportação incompleta: falta out/${name}`);
}
assert(!existsSync(join(out, '_worker.js')), 'A exportação estática não deve incluir um Worker.');

const preview = process.env.VERCEL_ENV === 'preview' || process.env.VERCEL_ENV === 'development'
  || (process.env.CF_PAGES === '1' && Boolean(process.env.CF_PAGES_BRANCH) && process.env.CF_PAGES_BRANCH !== 'main');
const sitemap = readFileSync(join(out, 'sitemap.xml'), 'utf8');
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => new URL(match[1]));
assert(urls.length >= 4, 'Sitemap sem as páginas institucionais.');
for (const url of urls) {
  assert.equal(url.origin, 'https://www.atlasdoagora.com.br', 'Preservar o domínio canônico durante a migração.');
  const html = readFileSync(join(out, decodeURIComponent(url.pathname), 'index.html'), 'utf8');
  assert(html.includes(`rel="canonical" href="${url.href}"`), `Canônica incorreta em ${url.pathname}`);
  const head = html.slice(0, html.indexOf('</head>'));
  assert.equal(/name="robots" content="[^"]*noindex/.test(head), preview, `Indexação incorreta em ${url.pathname}`);
  const scripts = [...head.matchAll(/<script\b[^>]*src="https:\/\/pagead2\.googlesyndication\.com\/pagead\/js\/adsbygoogle\.js\?client=ca-pub-3156649226090669"[^>]*>/g)];
  assert.equal(scripts.length, preview ? 0 : 1, `AdSense incorreto em ${url.pathname}`);
  assert.equal(head.includes('id="google-tag-manager"'), !preview, `GTM incorreto em ${url.pathname}`);
  if (process.env.CF_PAGES === '1') {
    assert(!html.includes('/_vercel/insights/'), 'Vercel Analytics não deve carregar no Pages.');
  }
}
const robots = readFileSync(join(out, 'robots.txt'), 'utf8');
assert(preview ? robots.includes('Disallow: /') : robots.includes('Allow: /'), 'robots.txt incorreto.');
assert.equal(readFileSync(join(out, 'ads.txt'), 'utf8').trim(), 'google.com, pub-3156649226090669, DIRECT, f08c47fec0942fa0');
const files = [];
function walk(directory) {
  for (const name of readdirSync(directory)) {
    const path = join(directory, name);
    const stats = statSync(path);
    if (stats.isDirectory()) walk(path);
    else { assert(stats.size <= 25 * 1024 * 1024, `Arquivo excede 25 MiB: ${path}`); files.push(path); }
  }
}
walk(out);
console.log(`Pages: ${urls.length} páginas do sitemap e ${files.length} arquivos verificados (${preview ? 'prévia sem indexação e tracking' : 'produção'}).`);
