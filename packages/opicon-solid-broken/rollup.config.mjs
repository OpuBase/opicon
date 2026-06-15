import { createRollupConfig } from '../../scripts/rollup.shared.mjs';

export default createRollupConfig({
  entry: 'src/opicon-solid-broken.ts',
  outputName: 'opicon-solid-broken',
  external: ['solid-js', 'solid-js/web', '@opudoc/opicon-shared'],
});
