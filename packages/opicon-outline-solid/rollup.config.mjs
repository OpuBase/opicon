import { createRollupConfig } from '../../scripts/rollup.shared.mjs';

export default createRollupConfig({
  entry: 'src/opicon-outline-solid.ts',
  outputName: 'opicon-outline-solid',
  external: ['solid-js', 'solid-js/web', '@opudoc/opicon-shared'],
});
