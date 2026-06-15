import { createRollupConfig } from '../../scripts/rollup.shared.mjs';

export default createRollupConfig({
  entry: 'src/opicon-angular-twotone.ts',
  outputName: 'opicon-angular-twotone',
  external: ['@angular/core', '@opudoc/opicon-shared'],
});
