import { createRollupConfig } from '../../scripts/rollup.shared.mjs';

export default createRollupConfig({
  entry: 'src/opicon-angular-outline.ts',
  outputName: 'opicon-angular-outline',
  external: ['@angular/core', '@opudoc/opicon-shared'],
});
