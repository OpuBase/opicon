import { createRollupConfig } from '../../scripts/rollup.shared.mjs';

export default createRollupConfig({
  entry: 'src/opicon-static-bulk.ts',
  outputName: 'opicon-static-bulk',
  external: [],
});
