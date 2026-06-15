import { createRollupConfig } from '../../scripts/rollup.shared.mjs';

export default createRollupConfig({
  entry: 'src/opicon-vue-bold.ts',
  outputName: 'opicon-vue-bold',
  external: ['vue', '@opudoc/opicon-shared'],
});
