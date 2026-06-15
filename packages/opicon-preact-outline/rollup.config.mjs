import { createRollupConfig } from '../../scripts/rollup.shared.mjs';

export default createRollupConfig({
  entry: 'src/opicon-preact-outline.ts',
  outputName: 'opicon-preact-outline',
  external: ['preact', 'preact/hooks', '@opudoc/opicon-shared'],
});
