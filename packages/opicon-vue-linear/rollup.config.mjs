import { createRollupConfig } from '../../scripts/rollup.shared.mjs';

export default createRollupConfig({
  entry: 'src/opicon-vue-linear.ts',
  outputName: 'opicon-vue-linear',
  external: ['vue', '@opudoc/opicon-shared'],
});
