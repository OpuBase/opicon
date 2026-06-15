import { createRollupConfig } from '../../scripts/rollup.shared.mjs';

export default createRollupConfig({
  entry: 'src/opicon-linear-static.ts',
  outputName: 'opicon-linear-static',
  external: [],
});
