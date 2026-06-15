import { createRollupConfig } from '../../scripts/rollup.shared.mjs';

export default createRollupConfig({
  entry: 'src/opicon-angular-bold.ts',
  outputName: 'opicon-angular-bold',
  external: ['@angular/core', '@opudoc/opicon-shared'],
});
