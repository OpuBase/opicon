import { createRollupConfig } from '../../scripts/rollup.shared.mjs';

export default createRollupConfig({
  entry: 'src/opicon-linear-vue.ts',
  outputName: 'opicon-linear-vue',
  external: ['vue', '@opudoc/opicon-shared'],
});
