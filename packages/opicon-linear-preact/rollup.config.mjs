import { createRollupConfig } from '../../scripts/rollup.shared.mjs';

export default createRollupConfig({
  entry: 'src/opicon-linear-preact.ts',
  outputName: 'opicon-linear-preact',
  external: ['preact', 'preact/hooks', '@opudoc/opicon-shared'],
});
