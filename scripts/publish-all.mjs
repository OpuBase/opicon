/**
 * Publish all @opudoc/opicon packages to npm.
 *
 * Mit Passkey-only 2FA: Granular Access Token nutzen (kein OTP).
 *   npm config set //registry.npmjs.org/:_authToken DEIN_TOKEN
 *   node scripts/publish-all.mjs
 */
import { execSync } from 'node:child_process';
import { readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';

const ROOT = join(fileURLToPath(new URL('.', import.meta.url)), '..');
const STYLES = ['bold', 'broken', 'bulk', 'linear', 'outline', 'twotone'];
const STYLE_BASE_PACKAGES = [
  'opicon',
  'opicon-react',
  'opicon-preact',
  'opicon-vue',
  'opicon-svelte',
  'opicon-solid',
  'opicon-react-native',
  'opicon-angular',
  'opicon-astro',
  'opicon-static',
];

const packages = [
  'packages/shared',
  'packages/opicon',
  'packages/opicon-react',
  'packages/opicon-preact',
  'packages/opicon-vue',
  'packages/opicon-svelte',
  'packages/opicon-solid',
  'packages/opicon-react-native',
  'packages/opicon-angular',
  'packages/opicon-astro',
  'packages/opicon-static',
  ...STYLE_BASE_PACKAGES.flatMap((base) => STYLES.map((style) => `packages/${base}-${style}`)),
];

let whoami = '';
try {
  whoami = execSync('npm whoami', { encoding: 'utf8' }).trim();
} catch {
  console.error('Nicht bei npm eingeloggt. Token setzen mit:');
  console.error('  npm config set //registry.npmjs.org/:_authToken DEIN_TOKEN');
  process.exit(1);
}

console.log(`npm user: ${whoami}`);
console.log('Publish ohne OTP (Granular Access Token / Passkey-Setup)\n');

process.env.NODE_OPTIONS = [process.env.NODE_OPTIONS, '--max-old-space-size=8192'].filter(Boolean).join(' ');

console.log('Building icons + style packages...\n');
execSync('node scripts/build-icons.mjs', { cwd: ROOT, stdio: 'inherit' });

for (const pkg of packages) {
  const pkgDir = join(ROOT, pkg);
  try {
    readdirSync(pkgDir);
  } catch {
    console.warn(`Skipping missing package: ${pkg}`);
    continue;
  }

  console.log(`Publishing ${pkg}...`);
  execSync('npx pnpm publish --access public --no-git-checks', {
    cwd: pkgDir,
    stdio: 'inherit',
  });
}

console.log('\nAlle @opudoc/opicon Packages veröffentlicht.');
