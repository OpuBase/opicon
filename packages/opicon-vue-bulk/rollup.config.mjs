import { createRollupConfig } from '../../scripts/rollup.shared.mjs';

export default createRollupConfig({
  entry: 'src/opicon-vue-bulk.ts',
  outputName: 'opicon-vue-bulk',
  external: ['vue', '@opudoc/opicon-shared'],
});
