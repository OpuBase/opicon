import { createRollupConfig } from '../../scripts/rollup.shared.mjs';

export default createRollupConfig({
  entry: 'src/opicon-bold.ts',
  outputName: 'opicon-bold',
  external: [],
});
