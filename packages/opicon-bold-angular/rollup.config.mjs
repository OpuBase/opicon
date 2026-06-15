import { createRollupConfig } from '../../scripts/rollup.shared.mjs';

export default createRollupConfig({
  entry: 'src/opicon-bold-angular.ts',
  outputName: 'opicon-bold-angular',
  external: ['@angular/core', '@opudoc/opicon-shared'],
});
