import { createRollupConfig } from '../../scripts/rollup.shared.mjs';

export default createRollupConfig({
  entry: 'src/opicon-bold-solid.ts',
  outputName: 'opicon-bold-solid',
  external: ['solid-js', 'solid-js/web', '@opudoc/opicon-shared'],
});
