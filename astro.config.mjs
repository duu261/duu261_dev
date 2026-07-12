// @ts-check
import { defineConfig } from 'astro/config';
import { satteri } from '@astrojs/markdown-satteri';
import { defineHastPlugin, defineMdastPlugin } from 'satteri';

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
      if (!node.value.includes('──▶')) return;
      const lines = node.value.replace(/\n+$/, '').split('\n');
      const last = [...lines].reverse().find((l) => l.trim());
      const html = lines.map((l) => colorLine(l, l === last)).join('\n');
      return { rawHtml: `<pre class="diagram"><code>${html}</code></pre>` };
    },
  });
}

// https://astro.build/config
export default defineConfig({
  markdown: {
    processor: satteri({
      hastPlugins: [jpHeadingLabels()],
      mdastPlugins: [diagramColors()],
    }),
    shikiConfig: {
      theme: 'catppuccin-macchiato',
    },
  },
});
