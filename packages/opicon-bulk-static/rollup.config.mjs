import { createRollupConfig } from '../../scripts/rollup.shared.mjs';

export default createRollupConfig({
  entry: 'src/opicon-bulk-static.ts',
  outputName: 'opicon-bulk-static',
  external: [],
});
