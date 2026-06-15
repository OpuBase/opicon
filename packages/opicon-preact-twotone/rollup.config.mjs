import { createRollupConfig } from '../../scripts/rollup.shared.mjs';

export default createRollupConfig({
  entry: 'src/opicon-preact-twotone.ts',
  outputName: 'opicon-preact-twotone',
  external: ['preact', 'preact/hooks', '@opudoc/opicon-shared'],
});
