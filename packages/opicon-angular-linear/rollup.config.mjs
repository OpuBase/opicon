import { createRollupConfig } from '../../scripts/rollup.shared.mjs';

export default createRollupConfig({
  entry: 'src/opicon-angular-linear.ts',
  outputName: 'opicon-angular-linear',
  external: ['@angular/core', '@opudoc/opicon-shared'],
});
