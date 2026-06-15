import { createRollupConfig } from '../../scripts/rollup.shared.mjs';

export default createRollupConfig({
  entry: 'src/opicon-static-bold.ts',
  outputName: 'opicon-static-bold',
  external: [],
});
