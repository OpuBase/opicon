import { createRollupConfig } from '../../scripts/rollup.shared.mjs';

export default createRollupConfig({
  entry: 'src/opicon-solid-outline.ts',
  outputName: 'opicon-solid-outline',
  external: ['solid-js', 'solid-js/web', '@opudoc/opicon-shared'],
});
