import { createRollupConfig } from '../../scripts/rollup.shared.mjs';

export default createRollupConfig({
  entry: 'src/opicon-bold-vue.ts',
  outputName: 'opicon-bold-vue',
  external: ['vue', '@opudoc/opicon-shared'],
});
