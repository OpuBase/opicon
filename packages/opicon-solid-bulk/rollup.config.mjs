import { createRollupConfig } from '../../scripts/rollup.shared.mjs';

export default createRollupConfig({
  entry: 'src/opicon-solid-bulk.ts',
  outputName: 'opicon-solid-bulk',
  external: ['solid-js', 'solid-js/web', '@opudoc/opicon-shared'],
});
