import { createRollupConfig } from '../../scripts/rollup.shared.mjs';

export default createRollupConfig({
  entry: 'src/opicon-broken-static.ts',
  outputName: 'opicon-broken-static',
  external: [],
});
