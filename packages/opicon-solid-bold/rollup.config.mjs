import { createRollupConfig } from '../../scripts/rollup.shared.mjs';

export default createRollupConfig({
  entry: 'src/opicon-solid-bold.ts',
  outputName: 'opicon-solid-bold',
  external: ['solid-js', 'solid-js/web', '@opudoc/opicon-shared'],
});
