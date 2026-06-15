import { createRollupConfig } from '../../scripts/rollup.shared.mjs';

export default createRollupConfig({
  entry: 'src/opicon-preact-bold.ts',
  outputName: 'opicon-preact-bold',
  external: ['preact', 'preact/hooks', '@opudoc/opicon-shared'],
});
