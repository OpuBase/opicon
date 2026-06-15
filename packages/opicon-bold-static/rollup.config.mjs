import { createRollupConfig } from '../../scripts/rollup.shared.mjs';

export default createRollupConfig({
  entry: 'src/opicon-bold-static.ts',
  outputName: 'opicon-bold-static',
  external: [],
});
