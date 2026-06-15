import { createRollupConfig } from '../../scripts/rollup.shared.mjs';

export default createRollupConfig({
  entry: 'src/opicon-linear.ts',
  outputName: 'opicon-linear',
  external: [],
});
