import { createRollupConfig } from '../../scripts/rollup.shared.mjs';

export default createRollupConfig({
  entry: 'src/opicon-broken-preact.ts',
  outputName: 'opicon-broken-preact',
  external: ['preact', 'preact/hooks', '@opudoc/opicon-shared'],
});
