import { createRollupConfig } from '../../scripts/rollup.shared.mjs';

export default createRollupConfig({
  entry: 'src/opicon-preact-bulk.ts',
  outputName: 'opicon-preact-bulk',
  external: ['preact', 'preact/hooks', '@opudoc/opicon-shared'],
});
