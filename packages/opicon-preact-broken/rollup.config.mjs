import { createRollupConfig } from '../../scripts/rollup.shared.mjs';

export default createRollupConfig({
  entry: 'src/opicon-preact-broken.ts',
  outputName: 'opicon-preact-broken',
  external: ['preact', 'preact/hooks', '@opudoc/opicon-shared'],
});
