import { createRollupConfig } from '../../scripts/rollup.shared.mjs';

export default createRollupConfig({
  entry: 'src/opicon-twotone-angular.ts',
  outputName: 'opicon-twotone-angular',
  external: ['@angular/core', '@opudoc/opicon-shared'],
});
