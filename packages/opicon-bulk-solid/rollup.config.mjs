import { createRollupConfig } from '../../scripts/rollup.shared.mjs';

export default createRollupConfig({
  entry: 'src/opicon-bulk-solid.ts',
  outputName: 'opicon-bulk-solid',
  external: ['solid-js', 'solid-js/web', '@opudoc/opicon-shared'],
});
