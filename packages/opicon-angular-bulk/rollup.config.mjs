import { createRollupConfig } from '../../scripts/rollup.shared.mjs';

export default createRollupConfig({
  entry: 'src/opicon-angular-bulk.ts',
  outputName: 'opicon-angular-bulk',
  external: ['@angular/core', '@opudoc/opicon-shared'],
});
