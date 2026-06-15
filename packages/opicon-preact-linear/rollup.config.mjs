import { createRollupConfig } from '../../scripts/rollup.shared.mjs';

export default createRollupConfig({
  entry: 'src/opicon-preact-linear.ts',
  outputName: 'opicon-preact-linear',
  external: ['preact', 'preact/hooks', '@opudoc/opicon-shared'],
});
