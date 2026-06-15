import { createRollupConfig } from '../../scripts/rollup.shared.mjs';

export default createRollupConfig({
  entry: 'src/opicon-static-twotone.ts',
  outputName: 'opicon-static-twotone',
  external: [],
});
