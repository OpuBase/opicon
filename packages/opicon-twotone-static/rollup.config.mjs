import { createRollupConfig } from '../../scripts/rollup.shared.mjs';

export default createRollupConfig({
  entry: 'src/opicon-twotone-static.ts',
  outputName: 'opicon-twotone-static',
  external: [],
});
