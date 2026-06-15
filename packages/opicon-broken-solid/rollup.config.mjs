import { createRollupConfig } from '../../scripts/rollup.shared.mjs';

export default createRollupConfig({
  entry: 'src/opicon-broken-solid.ts',
  outputName: 'opicon-broken-solid',
  external: ['solid-js', 'solid-js/web', '@opudoc/opicon-shared'],
});
