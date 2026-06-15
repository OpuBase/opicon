import { createRollupConfig } from '../../scripts/rollup.shared.mjs';

export default createRollupConfig({
  entry: 'src/opicon-linear-angular.ts',
  outputName: 'opicon-linear-angular',
  external: ['@angular/core', '@opudoc/opicon-shared'],
});
