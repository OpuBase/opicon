import { createRollupConfig } from '../../scripts/rollup.shared.mjs';

export default createRollupConfig({
  entry: 'src/opicon-outline-preact.ts',
  outputName: 'opicon-outline-preact',
  external: ['preact', 'preact/hooks', '@opudoc/opicon-shared'],
});
