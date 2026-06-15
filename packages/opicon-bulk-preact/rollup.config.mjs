import { createRollupConfig } from '../../scripts/rollup.shared.mjs';

export default createRollupConfig({
  entry: 'src/opicon-bulk-preact.ts',
  outputName: 'opicon-bulk-preact',
  external: ['preact', 'preact/hooks', '@opudoc/opicon-shared'],
});
