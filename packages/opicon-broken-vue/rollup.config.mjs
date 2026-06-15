import { createRollupConfig } from '../../scripts/rollup.shared.mjs';

export default createRollupConfig({
  entry: 'src/opicon-broken-vue.ts',
  outputName: 'opicon-broken-vue',
  external: ['vue', '@opudoc/opicon-shared'],
});
