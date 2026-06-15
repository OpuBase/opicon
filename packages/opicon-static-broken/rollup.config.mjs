import { createRollupConfig } from '../../scripts/rollup.shared.mjs';

export default createRollupConfig({
  entry: 'src/opicon-static-broken.ts',
  outputName: 'opicon-static-broken',
  external: [],
});
