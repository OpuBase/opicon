import { createRollupConfig } from '../../scripts/rollup.shared.mjs';

export default createRollupConfig({
  entry: 'src/opicon-broken.ts',
  outputName: 'opicon-broken',
  external: [],
});
