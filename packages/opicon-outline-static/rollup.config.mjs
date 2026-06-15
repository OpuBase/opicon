import { createRollupConfig } from '../../scripts/rollup.shared.mjs';

export default createRollupConfig({
  entry: 'src/opicon-outline-static.ts',
  outputName: 'opicon-outline-static',
  external: [],
});
