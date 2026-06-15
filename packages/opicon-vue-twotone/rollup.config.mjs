import { createRollupConfig } from '../../scripts/rollup.shared.mjs';

export default createRollupConfig({
  entry: 'src/opicon-vue-twotone.ts',
  outputName: 'opicon-vue-twotone',
  external: ['vue', '@opudoc/opicon-shared'],
});
