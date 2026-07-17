import { defineConfig } from 'astro/config';
import { satteri } from '@astrojs/markdown-satteri';
import { defineHastPlugin, defineMdastPlugin } from 'satteri';

import sitemap from '@astrojs/sitemap';

/** Wrap the leading CJK label of h2 headings ("問題 Problem") in <span class="jp">
 *  so pages can style it as a separate kicker without HTML in the markdown. */
function jpHeadingLabels() {
  return defineHastPlugin({
    name: 'jp-heading-labels',
    element: [
      {
        filter: ['h2'],
        visit(node, ctx) {
          const [first, ...rest] = node.children;
          if (first?.type !== 'text') return;
          const m = first.value.match(/^([぀-ヿ一-鿿]+)\s+/);
          if (!m) return;
          ctx.replaceNode(node, {
            ...node,
            children: [
              {
                type: 'element',
                tagName: 'span',
                properties: { className: ['jp'] },
                children: [{ type: 'text', value: m[1] }],
              },
              { type: 'text', value: first.value.slice(m[0].length) },
              ...rest,
            ],
          });
        },
      },
    ],
  });
}

/** Colorize plain-text architecture diagrams (any code fence containing ──▶):
 *  source before the arrow → peach, target after → red, (...) → muted,
 *  last non-empty line (the datastore leaf) → blue. Classes styled in global.css.
 *  Runs at the mdast stage and returns rawHtml so Shiki never re-highlights it.
 *  Fences without the arrow (and future image/SVG diagrams) pass through untouched. */
function diagramColors() {
  const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const span = (cls, s) => `<span class="${cls}">${esc(s)}</span>`;
  const colorLine = (line, isLast) => {
    if (isLast) return span('dia-blue', line);
    const arrow = line.indexOf('──▶');
    if (arrow !== -1) {
      return span('dia-peach', line.slice(0, arrow)) + '──▶' + span('dia-red', line.slice(arrow + 3));
    }
    return line
      .split(/(\([^)]*\))/)
      .filter(Boolean)
      .map((part) => (part.startsWith('(') ? span('dia-muted', part) : esc(part)))
      .join('');
  };
  return defineMdastPlugin({
    name: 'diagram-colors',
    code(node) {
      if (node.lang === 'blog-diagram' || !node.value.includes('──▶')) return;
      const lines = node.value.replace(/\n+$/, '').split('\n');
      const last = [...lines].reverse().find((l) => l.trim());
      const html = lines.map((l) => colorLine(l, l === last)).join('\n');
      return { rawHtml: `<pre class="diagram"><code>${html}</code></pre>` };
    },
  });
}

function blogDiagrams() {
  const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const span = (cls, s) => `<span class="${cls}">${esc(s)}</span>`;
  const colorLine = (line) => {
    const marker = line.match(/[├└]?──▶/);
    if (!marker) {
      const annotated = line.match(/^([^()]+)(\s*\([^)]*\))$/);
      if (annotated) return span('dia-red', annotated[1]) + span('dia-muted', annotated[2]);
      return esc(line);
    }
    const idx = marker.index ?? 0;
    const prefix = line.slice(0, idx);
    const rest = line.slice(idx + marker[0].length);
    const parts = rest.split('──▶');
    const tree = marker[0].startsWith('├') || marker[0].startsWith('└');
    if (!tree) {
      const colors = ['dia-red', 'dia-blue', 'dia-green', 'dia-mauve'];
      return span('dia-peach', prefix) + marker[0] + parts
        .map((part, partIdx) => span(colors[Math.min(partIdx, colors.length - 1)], part))
        .join('──▶');
    }
    const first = parts[0] ?? '';
    const columns = first.match(/^(\s*\S+(?:\s+\S+)*?)(\s{2,}.*)$/);
    const firstHtml = columns
      ? span('dia-peach', columns[1]) + span('dia-muted', columns[2])
      : span('dia-peach', first);
    const colors = ['dia-red', 'dia-blue', 'dia-green', 'dia-mauve'];
    return esc(prefix) + marker[0] + firstHtml + parts
      .slice(1)
      .map((part, partIdx) => '──▶' + span(colors[Math.min(partIdx, colors.length - 1)], part))
      .join('');
  };
  return defineMdastPlugin({
    name: 'blog-diagrams',
    code(node) {
      if (node.lang !== 'blog-diagram') return;
      const lines = node.value.replace(/\n+$/, '').split('\n');
      const html = lines.map((l) => colorLine(l)).join('\n');
      return { rawHtml: `<pre class="blog-diagram"><code>${html}</code></pre>` };
    },
  });
}

function filePanels() {
  const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const span = (cls, s) => `<span class="${cls}">${esc(s).replace(/ /g, '&nbsp;')}</span>`;
  const colorFileLine = (line) => {
    if (line.startsWith('##')) return span('file-comment', line);
    if (line.startsWith('- ')) return span('file-bullet', '-') + esc(line.slice(1)).replace(/ /g, '&nbsp;');
    const eq = line.indexOf('=');
    if (eq !== -1) {
      return span('file-key', line.slice(0, eq).trimEnd()) +
        esc(line.slice(line.lastIndexOf(line.slice(0, eq).trimEnd()) + line.slice(0, eq).trimEnd().length, eq + 1)).replace(/ /g, '&nbsp;') +
        span('file-value', line.slice(eq + 1).trimStart());
    }
    return esc(line).replace(/ /g, '&nbsp;');
  };
  const codeHtml = (s) =>
    s
      .split('\n')
      .map((line) => `<span>${colorFileLine(line)}</span>`)
      .join('<br>');
  const attr = (meta, name) => {
    const m = meta?.match(new RegExp(`${name}="([^"]+)"`));
    return m?.[1] ?? '';
  };
  return defineMdastPlugin({
    name: 'file-panels',
    code(node) {
      if (node.lang !== 'file') return;
      const title = attr(node.meta, 'title') || 'file';
      const status = attr(node.meta, 'status');
      return {
        rawHtml: `<div class="file-panel"><div class="file-panel-bar"><span>${esc(title)}</span>${status ? `<span class="status">${esc(status)}</span>` : ''}</div><div class="file-code">${codeHtml(node.value)}</div></div>`,
      };
    },
  });
}

// https://astro.build/config
export default defineConfig({
  site: 'https://duu261.me',

  markdown: {
    processor: satteri({
      hastPlugins: [jpHeadingLabels()],
      mdastPlugins: [filePanels(), blogDiagrams(), diagramColors()],
    }),
    shikiConfig: {
      theme: 'catppuccin-macchiato',
    },
  },

  integrations: [sitemap()],
});