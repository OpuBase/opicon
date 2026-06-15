import { createRollupConfig } from '../../scripts/rollup.shared.mjs';

export default createRollupConfig({
  entry: 'src/opicon-twotone-preact.ts',
  outputName: 'opicon-twotone-preact',
  external: ['preact', 'preact/hooks', '@opudoc/opicon-shared'],
});
