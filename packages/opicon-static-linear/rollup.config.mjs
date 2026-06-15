import { createRollupConfig } from '../../scripts/rollup.shared.mjs';

export default createRollupConfig({
  entry: 'src/opicon-static-linear.ts',
  outputName: 'opicon-static-linear',
  external: [],
});
