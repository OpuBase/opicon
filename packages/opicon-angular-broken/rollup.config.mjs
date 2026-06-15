import { createRollupConfig } from '../../scripts/rollup.shared.mjs';

export default createRollupConfig({
  entry: 'src/opicon-angular-broken.ts',
  outputName: 'opicon-angular-broken',
  external: ['@angular/core', '@opudoc/opicon-shared'],
});
