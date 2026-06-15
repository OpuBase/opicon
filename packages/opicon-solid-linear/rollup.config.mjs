import { createRollupConfig } from '../../scripts/rollup.shared.mjs';

export default createRollupConfig({
  entry: 'src/opicon-solid-linear.ts',
  outputName: 'opicon-solid-linear',
  external: ['solid-js', 'solid-js/web', '@opudoc/opicon-shared'],
});
