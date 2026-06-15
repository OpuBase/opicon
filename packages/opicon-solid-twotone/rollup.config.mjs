import { createRollupConfig } from '../../scripts/rollup.shared.mjs';

export default createRollupConfig({
  entry: 'src/opicon-solid-twotone.ts',
  outputName: 'opicon-solid-twotone',
  external: ['solid-js', 'solid-js/web', '@opudoc/opicon-shared'],
});
