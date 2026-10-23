// French typography for built pages whose <html lang="fr">: non-breaking spaces before
// « : ; ! ? » and inside « », and curly apostrophes. It runs after the build on visible text and on
// the few attributes people read (meta description, alt, title, aria-label, form messages).
// Left untouched: tags, character references, <script>, <style>, <pre>, <code>, <textarea>, and
// any element marked with another language (lang="en", lang="ar"), so CSP hashes, CSS, code
// samples and foreign-language quotes stay exactly as written.
import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const NBSP = ' ';
const NNBSP = ' '; // narrow no-break space, used before ; ! ?
const SPACES = '[ \\u00a0\\u202f]';

export function frenchText(text) {
  return text
    .replace(new RegExp(`(\\S)${SPACES}*:(?=\\s|$)`, 'g'), `$1${NBSP}:`)
    .replace(new RegExp(`(\\S)${SPACES}*([;!?])(?=\\s|$|[»)])`, 'g'), `$1${NNBSP}$2`)
    // A space before the punctuation that follows an inline tag, e.g. "</strong> :".
    .replace(new RegExp(`^${SPACES}+:(?=\\s|$)`), `${NBSP}:`)
    .replace(new RegExp(`^${SPACES}+([;!?])(?=\\s|$|[»)])`), `${NNBSP}$1`)
    .replace(new RegExp(`«${SPACES}*`, 'g'), `«${NBSP}`)
    .replace(new RegExp(`${SPACES}*»`, 'g'), `${NBSP}»`)
    .replace(/(\p{L})'(?=\p{L})/gu, '$1’');
}

const VOID = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'source', 'track', 'wbr']);
const VERBATIM = new Set(['pre', 'code', 'textarea']);
const READ_ATTRS = /(\s(?:alt|title|aria-label|data-msg-[a-z-]+)=")([^"]*)(")/g;
const READ_META = /(<meta\s+(?:name|property)="(?:description|og:description|og:title)"\s+content=")([^"]*)(")/g;

function tagName(tag) {
  return tag.match(/^<\/?([a-zA-Z][\w-]*)/)?.[1].toLowerCase() ?? '';
}

export function frenchHtml(html) {
  // Astro escapes ' as &#39;. Between two letters it is an apostrophe, so make it typographic.
  // Scripts and styles are matched first and kept as they are (their CSP hashes must not change).
  html = html.replace(/(<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>)|(\p{L})&#(?:39|x27);(?=\p{L})/gu, (m, block, letter) => block ?? `${letter}’`);
  const parts = html.split(/(<!--[\s\S]*?-->|<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>|<[^>]*>|&[#A-Za-z0-9]+;)/);
  let skip = null; // { tag, depth } while inside a verbatim or foreign-language element
  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];
    if (i % 2 === 0) {
      if (!skip && part) parts[i] = frenchText(part);
      continue;
    }
    if (part.startsWith('<!--') || part.startsWith('&') || /^<(script|style)\b/i.test(part)) continue;
    const name = tagName(part);
    if (part.startsWith('</')) {
      if (skip && name === skip.tag && --skip.depth === 0) skip = null;
      continue;
    }
    const opens = !VOID.has(name) && !part.endsWith('/>');
    if (skip) {
      if (opens && name === skip.tag) skip.depth++;
      continue;
    }
    if (opens && name !== 'html' && (VERBATIM.has(name) || /\slang="(?!fr)[a-z]/i.test(part))) {
      skip = { tag: name, depth: 1 };
      continue;
    }
    parts[i] = part.replace(READ_ATTRS, (_, a, v, b) => a + frenchText(v) + b).replace(READ_META, (_, a, v, b) => a + frenchText(v) + b);
  }
  return parts.join('');
}

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) walk(path);
    else if (name.endsWith('.html')) {
      const html = readFileSync(path, 'utf8');
      // French pages only: /fr/, plus the root chooser and the 404 page, which are lang="fr".
      if (/<html[^>]*\slang="fr"/.test(html)) writeFileSync(path, frenchHtml(html));
    }
  }
}

export default function frenchTypography() {
  return {
    name: 'french-typography',
    hooks: {
      'astro:build:done': ({ dir }) => walk(fileURLToPath(dir)),
    },
  };
}
