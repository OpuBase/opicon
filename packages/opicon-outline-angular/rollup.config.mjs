import { createRollupConfig } from '../../scripts/rollup.shared.mjs';

export default createRollupConfig({
  entry: 'src/opicon-outline-angular.ts',
  outputName: 'opicon-outline-angular',
  external: ['@angular/core', '@opudoc/opicon-shared'],
});
