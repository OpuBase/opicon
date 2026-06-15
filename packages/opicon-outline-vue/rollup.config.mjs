import { createRollupConfig } from '../../scripts/rollup.shared.mjs';

export default createRollupConfig({
  entry: 'src/opicon-outline-vue.ts',
  outputName: 'opicon-outline-vue',
  external: ['vue', '@opudoc/opicon-shared'],
});
