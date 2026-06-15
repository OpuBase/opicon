import { createRollupConfig } from '../../scripts/rollup.shared.mjs';

export default createRollupConfig({
  entry: 'src/opicon-vue-outline.ts',
  outputName: 'opicon-vue-outline',
  external: ['vue', '@opudoc/opicon-shared'],
});
