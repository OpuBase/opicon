import { createRollupConfig } from '../../scripts/rollup.shared.mjs';

export default createRollupConfig({
  entry: 'src/opicon-outline.ts',
  outputName: 'opicon-outline',
  external: [],
});
