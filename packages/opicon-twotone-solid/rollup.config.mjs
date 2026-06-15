import { createRollupConfig } from '../../scripts/rollup.shared.mjs';

export default createRollupConfig({
  entry: 'src/opicon-twotone-solid.ts',
  outputName: 'opicon-twotone-solid',
  external: ['solid-js', 'solid-js/web', '@opudoc/opicon-shared'],
});
