import { createRollupConfig } from '../../scripts/rollup.shared.mjs';

export default createRollupConfig({
  entry: 'src/opicon-bulk-vue.ts',
  outputName: 'opicon-bulk-vue',
  external: ['vue', '@opudoc/opicon-shared'],
});
