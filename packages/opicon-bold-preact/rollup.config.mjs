import { createRollupConfig } from '../../scripts/rollup.shared.mjs';

export default createRollupConfig({
  entry: 'src/opicon-bold-preact.ts',
  outputName: 'opicon-bold-preact',
  external: ['preact', 'preact/hooks', '@opudoc/opicon-shared'],
});
