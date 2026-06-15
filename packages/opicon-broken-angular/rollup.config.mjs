import { createRollupConfig } from '../../scripts/rollup.shared.mjs';

export default createRollupConfig({
  entry: 'src/opicon-broken-angular.ts',
  outputName: 'opicon-broken-angular',
  external: ['@angular/core', '@opudoc/opicon-shared'],
});
