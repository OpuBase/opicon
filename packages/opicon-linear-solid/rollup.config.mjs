import { createRollupConfig } from '../../scripts/rollup.shared.mjs';

export default createRollupConfig({
  entry: 'src/opicon-linear-solid.ts',
  outputName: 'opicon-linear-solid',
  external: ['solid-js', 'solid-js/web', '@opudoc/opicon-shared'],
});
