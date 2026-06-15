import { createRollupConfig } from '../../scripts/rollup.shared.mjs';

export default createRollupConfig({
  entry: 'src/opicon-twotone-vue.ts',
  outputName: 'opicon-twotone-vue',
  external: ['vue', '@opudoc/opicon-shared'],
});
