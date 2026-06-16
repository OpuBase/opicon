/**
 * Publish all @opudoc/opicon packages to npm.
 *
 * Mit Passkey-only 2FA: Granular Access Token nutzen (kein OTP).
 *   npm config set //registry.npmjs.org/:_authToken DEIN_TOKEN
 *   node scripts/publish-all.mjs
 */
import { execSync } from 'node:child_process';
import { readdirSync, writeFileSync, unlinkSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';
import { listStylePackageDirs } from './generate-style-packages.mjs';

const ROOT = join(fileURLToPath(new URL('.', import.meta.url)), '..');

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
  ...listStylePackageDirs(),
];

const npmEnv = { ...process.env };
let tempNpmrc;

if (process.env.NPM_TOKEN) {
  tempNpmrc = join(tmpdir(), `opicon-publish-${process.pid}.npmrc`);
  writeFileSync(tempNpmrc, `//registry.npmjs.org/:_authToken=${process.env.NPM_TOKEN}\n`, 'utf8');
  npmEnv.NPM_CONFIG_USERCONFIG = tempNpmrc;
}

function run(cmd, cwd) {
  execSync(cmd, { cwd, stdio: 'inherit', env: npmEnv });
}

function tryPublish(pkgDir) {
  try {
    execSync('npx pnpm publish --access public --no-git-checks', {
      cwd: pkgDir,
      stdio: 'pipe',
      env: npmEnv,
      encoding: 'utf8',
    });
    return true;
  } catch (error) {
    const output = `${error.stdout ?? ''}${error.stderr ?? ''}`;
    if (/previously published versions/i.test(output) || /You cannot publish over/i.test(output)) {
      console.warn(`Already published (continuing): ${pkgDir}`);
      return true;
    }
    if (error.stdout) process.stdout.write(error.stdout);
    if (error.stderr) process.stderr.write(error.stderr);
    throw error;
  }
}

function getPackageVersion(pkgDir) {
  const json = JSON.parse(readFileSync(join(pkgDir, 'package.json'), 'utf8'));
  return { name: json.name, version: json.version };
}

function isPublished(name, version) {
  try {
    const published = execSync(`npm view ${name} version`, { encoding: 'utf8', env: npmEnv }).trim();
    return published === version;
  } catch {
    return false;
  }
}

let whoami = '';
try {
  whoami = execSync('npm whoami', { encoding: 'utf8', env: npmEnv }).trim();
} catch {
  console.error('Nicht bei npm eingeloggt. Token setzen mit:');
  console.error('  NPM_TOKEN=dein_token node scripts/publish-all.mjs');
  if (tempNpmrc) unlinkSync(tempNpmrc);
  process.exit(1);
}

console.log(`npm user: ${whoami}`);
console.log('Publish ohne OTP (Granular Access Token / Passkey-Setup)\n');

process.env.NODE_OPTIONS = [process.env.NODE_OPTIONS, '--max-old-space-size=8192'].filter(Boolean).join(' ');

if (!process.env.SKIP_BUILD) {
  console.log('Building icons + style packages...\n');
  run('node scripts/build-icons.mjs', ROOT);
} else {
  console.log('Skipping icon build (SKIP_BUILD set).\n');
  run('npx pnpm --filter @opudoc/opicon-shared build', ROOT);
}

for (const pkg of packages) {
  const pkgDir = join(ROOT, pkg);
  try {
    readdirSync(pkgDir);
  } catch {
    console.warn(`Skipping missing package: ${pkg}`);
    continue;
  }

  const { name, version } = getPackageVersion(pkgDir);
  if (isPublished(name, version)) {
    console.log(`Skipping ${name}@${version} (already on npm)`);
    continue;
  }

  console.log(`Publishing ${pkg}...`);
  tryPublish(pkgDir);

  const distDir = join(pkgDir, 'dist');
  if (pkg !== 'packages/shared') {
    try {
      rmSync(distDir, { recursive: true, force: true });
    } catch {
      // ignore
    }
  }
}

if (tempNpmrc) unlinkSync(tempNpmrc);

console.log('\nAlle @opudoc/opicon Packages veröffentlicht.');
