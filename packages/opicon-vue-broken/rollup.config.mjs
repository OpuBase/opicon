import { createRollupConfig } from '../../scripts/rollup.shared.mjs';

export default createRollupConfig({
  entry: 'src/opicon-vue-broken.ts',
  outputName: 'opicon-vue-broken',
  external: ['vue', '@opudoc/opicon-shared'],
});
