import { readdir, readFile, writeFile } from 'fs/promises';
import { join, relative } from 'path';
import { fileURLToPath } from 'url';
import { parseSync, stringify } from 'svgson';

const ROOT = join(fileURLToPath(new URL('.', import.meta.url)), '..');
const ICONS_DIR = join(ROOT, 'icons');

const PRIORITY_CATEGORIES = new Set(['arrow', 'search', 'essential']);
const STROKE_STYLES = new Set(['broken', 'linear', 'outline', 'twotone']);
const DRAWABLE_TAGS = new Set(['path', 'rect', 'circle', 'ellipse', 'line', 'polyline', 'polygon']);

const STYLE_G_ATTRS = {
  'arrow/broken': {
    stroke: '#fff',
    'stroke-linecap': 'round',
    'stroke-miterlimit': '10',
    'stroke-width': '1.5',
  },
  'arrow/linear': {
    stroke: '#fff',
    'stroke-linecap': 'round',
    'stroke-linejoin': 'round',
    'stroke-width': '1.71',
  },
  'arrow/twotone': {
    stroke: '#fff',
    'stroke-linecap': 'round',
    'stroke-miterlimit': '10',
    'stroke-width': '1.5',
  },
  'arrow/outline': {
    stroke: '#fff',
    'stroke-linecap': 'round',
    'stroke-linejoin': 'round',
    'stroke-width': '1.5',
  },
  'search/broken': {
    stroke: '#fff',
    'stroke-linecap': 'round',
    'stroke-linejoin': 'round',
    'stroke-width': '1.5',
  },
  'search/linear': {
    stroke: '#fff',
    'stroke-linecap': 'round',
    'stroke-linejoin': 'round',
    'stroke-width': '1.5',
  },
  'search/twotone': {
    stroke: '#fff',
    'stroke-linecap': 'round',
    'stroke-linejoin': 'round',
    'stroke-width': '1.5',
  },
  'essential/broken': {
    stroke: '#fff',
    'stroke-linecap': 'round',
    'stroke-linejoin': 'round',
    'stroke-width': '1.5',
  },
  'essential/linear': {
    stroke: '#fff',
    'stroke-linecap': 'round',
    'stroke-linejoin': 'round',
    'stroke-width': '1.5',
  },
  'essential/twotone': {
    stroke: '#fff',
    'stroke-linecap': 'round',
    'stroke-linejoin': 'round',
    'stroke-width': '1.5',
  },
};

function isVoidIcon(ast) {
  const rootFill = ast.attributes?.fill;
  const rootStroke = ast.attributes?.stroke;
  let voidPaths = 0;
  let total = 0;

  function walk(node, inheritedFill, inheritedStroke) {
    if (!node?.name) return;
    const attrs = node.attributes ?? {};
    const fill = attrs.fill !== undefined ? attrs.fill : inheritedFill;
    const stroke = attrs.stroke !== undefined ? attrs.stroke : inheritedStroke;

    if (DRAWABLE_TAGS.has(node.name)) {
      total += 1;
      const noFill = !fill || fill === 'none';
      const noStroke = !stroke || stroke === 'none';
      if (noFill && noStroke) voidPaths += 1;
    }

    for (const child of node.children ?? []) {
      walk(child, fill, stroke);
    }
  }

  for (const child of ast.children ?? []) {
    if (child.name === 'defs') continue;
    walk(child, rootFill, rootStroke);
  }

  return total > 0 && voidPaths === total;
}

function fixVoidAst(ast, styleKey) {
  const gAttrs = STYLE_G_ATTRS[styleKey];
  if (!gAttrs) return ast;

  const contentNodes = (ast.children ?? []).filter((node) => node.name !== 'defs');
  const defsNodes = (ast.children ?? []).filter((node) => node.name === 'defs');

  return {
    ...ast,
    children: [
      {
        name: 'g',
        type: 'element',
        attributes: { ...gAttrs },
        children: contentNodes,
      },
      ...defsNodes,
    ],
  };
}

async function* walkSvgs(dir, base = dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      yield* walkSvgs(full, base);
    } else if (entry.name.endsWith('.svg')) {
      yield {
        full,
        rel: relative(base, full).replace(/\\/g, '/'),
      };
    }
  }
}

async function main() {
  let scanned = 0;
  let updated = 0;
  const updatedByCategory = { arrow: 0, search: 0, essential: 0 };

  for await (const { full, rel } of walkSvgs(ICONS_DIR)) {
    scanned += 1;
    const parts = rel.split('/');
    const category = parts[0];
    const style = parts[1];
    if (!PRIORITY_CATEGORIES.has(category) || !STROKE_STYLES.has(style)) continue;

    const original = await readFile(full, 'utf8');
    const ast = parseSync(original);
    if (!isVoidIcon(ast)) continue;

    const styleKey = `${category}/${style}`;
    const fixed = fixVoidAst(ast, styleKey);
    const output = stringify(fixed);
    if (output === original) continue;

    await writeFile(full, output, 'utf8');
    updated += 1;
    updatedByCategory[category] += 1;
    console.log(`fixed: ${rel}`);
  }

  console.log(`Scanned ${scanned} SVGs`);
  console.log(`Updated ${updated} void icons`, updatedByCategory);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
