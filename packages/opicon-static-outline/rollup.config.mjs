import { createRollupConfig } from '../../scripts/rollup.shared.mjs';

export default createRollupConfig({
  entry: 'src/opicon-static-outline.ts',
  outputName: 'opicon-static-outline',
  external: [],
});
