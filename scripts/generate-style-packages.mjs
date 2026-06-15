import { readdir, readFile, writeFile, mkdir, copyFile, rm, stat } from 'fs/promises';
import { join } from 'path';
import { fileURLToPath } from 'url';

const ROOT = join(fileURLToPath(new URL('.', import.meta.url)), '..');
const STYLES = ['bold', 'broken', 'bulk', 'linear', 'outline', 'twotone'];

const PACKAGE_META = {
  opicon: {
    suffix: null,
    build: 'rollup',
    entryBase: 'opicon',
    description: 'An Opicon icon library package for web and JavaScript applications ({style} style).',
    keywords: ['Opicon', 'Icons', 'Icon', 'SVG', 'JavaScript'],
    hasIconsMap: true,
    external: [],
  },
  'opicon-react': {
    suffix: 'react',
    build: 'rollup',
    entryBase: 'opicon-react',
    description: 'An Opicon icon library package for React applications ({style} style).',
    keywords: ['Opicon', 'React', 'Icons', 'Icon', 'SVG'],
    peerDependencies: { react: '^16.5.1 || ^17.0.0 || ^18.0.0 || ^19.0.0' },
    external: ['react', 'react/jsx-runtime', '@opudoc/opicon-shared'],
  },
  'opicon-preact': {
    suffix: 'preact',
    build: 'rollup',
    entryBase: 'opicon-preact',
    description: 'An Opicon icon library package for Preact applications ({style} style).',
    keywords: ['Opicon', 'Preact', 'Icons', 'Icon', 'SVG'],
    peerDependencies: { preact: '^10.0.0' },
    external: ['preact', 'preact/hooks', '@opudoc/opicon-shared'],
  },
  'opicon-vue': {
    suffix: 'vue',
    build: 'rollup',
    entryBase: 'opicon-vue',
    description: 'An Opicon icon library package for Vue applications ({style} style).',
    keywords: ['Opicon', 'Vue', 'Icons', 'Icon', 'SVG'],
    peerDependencies: { vue: '^3.0.0' },
    external: ['vue', '@opudoc/opicon-shared'],
  },
  'opicon-svelte': {
    suffix: 'svelte',
    build: 'svelte',
    entryBase: 'opicon-svelte',
    description: 'An Opicon icon library package for Svelte applications ({style} style).',
    keywords: ['Opicon', 'Svelte', 'Icons', 'Icon', 'SVG'],
    peerDependencies: { svelte: '^4.0.0 || ^5.0.0' },
  },
  'opicon-solid': {
    suffix: 'solid',
    build: 'rollup',
    entryBase: 'opicon-solid',
    description: 'An Opicon icon library package for Solid applications ({style} style).',
    keywords: ['Opicon', 'Solid', 'Icons', 'Icon', 'SVG'],
    peerDependencies: { 'solid-js': '^1.0.0' },
    external: ['solid-js', 'solid-js/web', '@opudoc/opicon-shared'],
  },
  'opicon-react-native': {
    suffix: 'react-native',
    build: 'rollup',
    entryBase: 'opicon-react-native',
    description: 'An Opicon icon library package for React Native applications ({style} style).',
    keywords: ['Opicon', 'React Native', 'Icons', 'Icon', 'SVG'],
    peerDependencies: {
      react: '*',
      'react-native': '*',
      'react-native-svg': '>=13.0.0',
    },
    external: ['react', 'react-native', 'react-native-svg', '@opudoc/opicon-shared'],
  },
  'opicon-angular': {
    suffix: 'angular',
    build: 'rollup',
    entryBase: 'opicon-angular',
    description: 'An Opicon icon library package for Angular applications ({style} style).',
    keywords: ['Opicon', 'Angular', 'Icons', 'Icon', 'SVG'],
    peerDependencies: { '@angular/core': '^17.0.0 || ^18.0.0 || ^19.0.0' },
    external: ['@angular/core', '@opudoc/opicon-shared'],
  },
  'opicon-astro': {
    suffix: 'astro',
    build: 'astro',
    entryBase: 'opicon-astro',
    description: 'An Opicon icon library package for Astro applications ({style} style).',
    keywords: ['Opicon', 'Astro', 'Icons', 'Icon', 'SVG'],
    peerDependencies: { astro: '^4.0.0 || ^5.0.0' },
  },
  'opicon-static': {
    suffix: 'static',
    build: 'static',
    entryBase: 'opicon-static',
    description: 'Static SVG assets and icon nodes for the Opicon icon library ({style} style).',
    keywords: ['Opicon', 'Icons', 'Icon', 'SVG', 'Static'],
    hasStaticAssets: true,
    external: [],
  },
};

/** @opudoc/opicon-{style} or @opudoc/opicon-{style}-{suffix} */
function getStylePackageId(parentPkg, style) {
  const meta = PACKAGE_META[parentPkg];
  const base = meta.suffix ? `opicon-${style}-${meta.suffix}` : `opicon-${style}`;
  return {
    dirName: base,
    npmName: `@opudoc/${base}`,
    outputName: base,
    entryFile: `${base}.ts`,
  };
}

function toPascalCase(str) {
  return str
    .split(/[-_/.]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');
}

function matchesStyle(id, style) {
  return id.includes(`-${style}-`);
}

function styleLabel(style) {
  return style.charAt(0).toUpperCase() + style.slice(1);
}

async function readJson(path) {
  return JSON.parse(await readFile(path, 'utf8'));
}

async function copySrcFiles(parentPkg, stylePkgDir, meta, styleId) {
  const srcDir = join(ROOT, 'packages', parentPkg, 'src');
  const destDir = join(stylePkgDir, 'src');
  await mkdir(destDir, { recursive: true });

  const parentEntry = `${meta.entryBase}.ts`;
  const styledEntry = styleId.entryFile;

  for (const file of await readdir(srcDir)) {
    if (file === 'icons' || file === 'icons-map.ts') continue;
    const srcPath = join(srcDir, file);
    if ((await stat(srcPath)).isDirectory()) continue;

    if (file === parentEntry && meta.build !== 'astro') {
      await copyFile(srcPath, join(destDir, styledEntry));
      continue;
    }

    await copyFile(srcPath, join(destDir, file));
  }
}

async function filterIconsDir(parentIconsDir, destIconsDir, style, { isSvelte = false, isAstro = false } = {}) {
  await rm(destIconsDir, { recursive: true, force: true });
  await mkdir(destIconsDir, { recursive: true });

  const icons = [];
  for (const file of await readdir(parentIconsDir)) {
    const id = file.replace(/\.(ts|svelte|astro)$/, '');
    if (!matchesStyle(id, style)) continue;

    await copyFile(join(parentIconsDir, file), join(destIconsDir, file));
    icons.push({ id, componentName: toPascalCase(id) });
  }

  icons.sort((a, b) => a.id.localeCompare(b.id));

  const ext = isSvelte ? '.svelte' : isAstro ? '.astro' : '.ts';
  const lines = icons.map(({ componentName, id }) => {
    const file = isSvelte ? `./${id}.svelte` : `./${id}${ext}`;
    return `export { default as ${componentName} } from '${file}';`;
  });

  const barrelName = isSvelte || isAstro ? 'index.ts' : `index${ext}`;
  await writeFile(join(destIconsDir, barrelName), `${lines.join('\n')}\n`, 'utf8');

  return icons;
}

async function writeIconsMap(stylePkgDir, icons) {
  const imports = icons.map((i) => `import ${i.componentName} from './icons/${i.id}';`).join('\n');
  const entries = icons.map((i) => `  '${i.id}': ${i.componentName},`).join('\n');
  await writeFile(
    join(stylePkgDir, 'src', 'icons-map.ts'),
    `${imports}\n\nimport type { Icons } from './types';\n\nexport const icons: Icons = {\n${entries}\n};\n`,
    'utf8',
  );
}

async function filterStaticAssets(parentPkgDir, stylePkgDir, style) {
  const manifest = await readJson(join(parentPkgDir, 'manifest.json'));
  const iconNodes = await readJson(join(parentPkgDir, 'icon-nodes.json'));
  const filteredManifest = manifest.filter((entry) => entry.type === style);
  const filteredNodes = {};

  const iconsOut = join(stylePkgDir, 'icons');
  await rm(iconsOut, { recursive: true, force: true });
  await mkdir(iconsOut, { recursive: true });

  for (const entry of filteredManifest) {
    filteredNodes[entry.id] = iconNodes[entry.id];
    await copyFile(join(parentPkgDir, 'icons', `${entry.id}.svg`), join(iconsOut, `${entry.id}.svg`));
  }

  await writeFile(join(stylePkgDir, 'manifest.json'), `${JSON.stringify(filteredManifest, null, 2)}\n`, 'utf8');
  await writeFile(join(stylePkgDir, 'icon-nodes.json'), `${JSON.stringify(filteredNodes, null, 2)}\n`, 'utf8');

  const staticIconsDir = join(stylePkgDir, 'src', 'icons');
  await filterIconsDir(join(parentPkgDir, 'src', 'icons'), staticIconsDir, style);
}

function buildRollupConfig(outputName, external) {
  const externalList = external.map((item) => `'${item}'`).join(', ');
  return `import { createRollupConfig } from '../../scripts/rollup.shared.mjs';\n\nexport default createRollupConfig({\n  entry: 'src/${outputName}.ts',\n  outputName: '${outputName}',\n  external: [${externalList}],\n});\n`;
}

async function writePackageJson(parentPkgDir, stylePkgDir, styleId, meta, version) {
  const parentJson = await readJson(join(parentPkgDir, 'package.json'));
  const { dirName, npmName, outputName } = styleId;
  const styleName = styleLabel(styleId.style);

  const pkg = {
    name: npmName,
    version,
    description: meta.description.replace('{style}', styleName),
    license: 'ISC',
    homepage: 'https://opicon.net',
    bugs: 'https://github.com/OpuDoc/opicon/issues',
    repository: {
      type: 'git',
      url: 'https://github.com/OpuDoc/opicon.git',
      directory: `packages/${dirName}`,
    },
    author: parentJson.author,
    contributors: parentJson.contributors,
    publishConfig: { access: 'public' },
    keywords: [...meta.keywords, styleName],
    sideEffects: false,
  };

  if (meta.build === 'rollup' || meta.build === 'static') {
    pkg.main = `dist/cjs/${outputName}.js`;
    pkg.module = `dist/esm/${outputName}.mjs`;
    pkg.types = `dist/${outputName}.d.ts`;
    pkg.files = meta.build === 'static' ? ['dist', 'icons', 'icon-nodes.json', 'manifest.json'] : ['dist'];
    pkg.scripts = {
      clean: "node -e \"require('fs').rmSync('dist',{recursive:true,force:true})\"",
      build: 'pnpm clean && rollup -c rollup.config.mjs',
      prepublishOnly: 'pnpm build',
    };
  }

  if (meta.build === 'svelte') {
    pkg.type = 'module';
    pkg.files = ['src'];
    pkg.exports = {
      '.': `./src/${outputName}.ts`,
      './Icon.svelte': './src/Icon.svelte',
      './icons/*': './src/icons/*',
    };
    pkg.scripts = {
      build: `node -e "console.log('${npmName} ships Svelte source from src/')"`,
      prepublishOnly: 'node ../../scripts/build-icons.mjs',
    };
  }

  if (meta.build === 'astro') {
    pkg.type = 'module';
    pkg.files = ['src'];
    pkg.exports = {
      '.': './src/index.ts',
      './Icon.astro': './src/Icon.astro',
      './icons/*': './src/icons/*',
    };
    pkg.scripts = {
      build: `node -e "console.log('${npmName} uses generated src/icons from root build:icons')"`,
      prepublishOnly: 'pnpm build',
    };
  }

  if (meta.peerDependencies) {
    pkg.peerDependencies = meta.peerDependencies;
  }

  if (parentJson.dependencies?.['@opudoc/opicon-shared']) {
    pkg.dependencies = { '@opudoc/opicon-shared': 'workspace:*' };
  }

  if (meta.build === 'rollup' || meta.build === 'static') {
    pkg.devDependencies = {
      '@rollup/plugin-node-resolve': '^16.0.0',
      rollup: '^4.59.0',
      'rollup-plugin-dts': '^6.2.3',
      'rollup-plugin-esbuild': '^6.2.1',
      typescript: '^5.8.3',
      ...(parentJson.devDependencies?.vue ? { vue: parentJson.devDependencies.vue } : {}),
      ...(parentJson.devDependencies?.react ? { react: parentJson.devDependencies.react } : {}),
      ...(parentJson.devDependencies?.preact ? { preact: parentJson.devDependencies.preact } : {}),
      ...(parentJson.devDependencies?.['solid-js'] ? { 'solid-js': parentJson.devDependencies['solid-js'] } : {}),
      ...(parentJson.devDependencies?.['@angular/core'] ? { '@angular/core': parentJson.devDependencies['@angular/core'] } : {}),
      ...(parentJson.devDependencies?.['@types/react'] ? { '@types/react': parentJson.devDependencies['@types/react'] } : {}),
      ...(parentJson.devDependencies?.['react-native-svg']
        ? { 'react-native-svg': parentJson.devDependencies['react-native-svg'] }
        : {}),
    };
  } else if (meta.build === 'astro') {
    pkg.devDependencies = { typescript: '^5.8.3' };
  } else if (meta.build === 'svelte') {
    pkg.devDependencies = {};
  }

  await writeFile(join(stylePkgDir, 'package.json'), `${JSON.stringify(pkg, null, 2)}\n`, 'utf8');
}

async function copyTsConfig(parentPkgDir, stylePkgDir) {
  const tsconfigPath = join(parentPkgDir, 'tsconfig.json');
  try {
    await copyFile(tsconfigPath, join(stylePkgDir, 'tsconfig.json'));
  } catch {
    // astro has no tsconfig
  }
}

async function removeLegacyStylePackages() {
  const legacyPattern = /^opicon-(react|preact|vue|svelte|solid|react-native|angular|astro|static)-(bold|broken|bulk|linear|outline|twotone)$/;
  for (const entry of await readdir(join(ROOT, 'packages'), { withFileTypes: true })) {
    if (!entry.isDirectory() || !legacyPattern.test(entry.name)) continue;
    await rm(join(ROOT, 'packages', entry.name), { recursive: true, force: true });
    console.log(`Removed legacy package dir packages/${entry.name}`);
  }
}

async function generateStylePackage(parentPkg, style) {
  const meta = PACKAGE_META[parentPkg];
  const styleId = { ...getStylePackageId(parentPkg, style), style };
  const parentPkgDir = join(ROOT, 'packages', parentPkg);
  const stylePkgDir = join(ROOT, 'packages', styleId.dirName);
  const { outputName } = styleId;
  const parentJson = await readJson(join(parentPkgDir, 'package.json'));
  const version = parentJson.version;

  await mkdir(stylePkgDir, { recursive: true });
  await writePackageJson(parentPkgDir, stylePkgDir, styleId, meta, version);

  if (meta.build === 'rollup' || meta.build === 'static') {
    await writeFile(join(stylePkgDir, 'rollup.config.mjs'), buildRollupConfig(outputName, meta.external ?? []), 'utf8');
    await copyTsConfig(parentPkgDir, stylePkgDir);
  }

  await copySrcFiles(parentPkg, stylePkgDir, meta, styleId);

  const parentIconsDir = join(parentPkgDir, 'src', 'icons');
  const destIconsDir = join(stylePkgDir, 'src', 'icons');
  const icons = await filterIconsDir(parentIconsDir, destIconsDir, style, {
    isSvelte: meta.build === 'svelte',
    isAstro: meta.build === 'astro',
  });

  if (meta.hasIconsMap) {
    await writeIconsMap(stylePkgDir, icons);
  }

  if (meta.hasStaticAssets) {
    await filterStaticAssets(parentPkgDir, stylePkgDir, style);
  }

  console.log(`Generated ${styleId.dirName} (${icons.length} icons)`);
}

export function listStylePackageDirs() {
  return Object.keys(PACKAGE_META).flatMap((parentPkg) =>
    STYLES.map((style) => `packages/${getStylePackageId(parentPkg, style).dirName}`),
  );
}

export async function generateStylePackages() {
  await removeLegacyStylePackages();
  for (const parentPkg of Object.keys(PACKAGE_META)) {
    for (const style of STYLES) {
      await generateStylePackage(parentPkg, style);
    }
  }
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  generateStylePackages().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
