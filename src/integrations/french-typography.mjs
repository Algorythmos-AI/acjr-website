// French typography for the built /fr/ pages: non-breaking spaces before « : ; ! ? »
// and inside « », and curly apostrophes. It runs after the build, on visible text only:
// tags, character references, <script> and <style> are left untouched, so CSP hashes and CSS stay valid.
import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const NBSP = ' ';
const NNBSP = ' '; // narrow no-break space, used before ; ! ?

export function frenchText(text) {
  return text
    .replace(/(\S)[   ]*:(?=\s|$)/g, `$1${NBSP}:`)
    .replace(/(\S)[   ]*([;!?])(?=\s|$|[»)])/g, `$1${NNBSP}$2`)
    .replace(/«[   ]*/g, `«${NBSP}`)
    .replace(/[   ]*»/g, `${NBSP}»`)
    .replace(/([A-Za-zÀ-ÿ])'([A-Za-zÀ-ÿ])/g, '$1’$2');
}

export function frenchHtml(html) {
  return html
    // Character references (&nbsp; &#39; …) are kept whole, like tags.
    .split(/(<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>|<!--[\s\S]*?-->|<[^>]*>|&[#A-Za-z0-9]+;)/)
    .map((part, i) => (i % 2 === 1 ? part : frenchText(part)))
    .join('');
}

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) walk(path);
    else if (name.endsWith('.html')) writeFileSync(path, frenchHtml(readFileSync(path, 'utf8')));
  }
}

export default function frenchTypography() {
  return {
    name: 'french-typography',
    hooks: {
      'astro:build:done': ({ dir }) => {
        const fr = join(fileURLToPath(dir), 'fr');
        try {
          walk(fr);
        } catch (error) {
          if (error.code !== 'ENOENT') throw error;
        }
      },
    },
  };
}
