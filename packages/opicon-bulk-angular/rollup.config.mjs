import { createRollupConfig } from '../../scripts/rollup.shared.mjs';

export default createRollupConfig({
  entry: 'src/opicon-bulk-angular.ts',
  outputName: 'opicon-bulk-angular',
  external: ['@angular/core', '@opudoc/opicon-shared'],
});
