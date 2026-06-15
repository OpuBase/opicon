import { createRollupConfig } from '../../scripts/rollup.shared.mjs';

export default createRollupConfig({
  entry: 'src/opicon-twotone.ts',
  outputName: 'opicon-twotone',
  external: [],
});
