import { createRollupConfig } from '../../scripts/rollup.shared.mjs';

export default createRollupConfig({
  entry: 'src/opicon-bulk-react.ts',
  outputName: 'opicon-bulk-react',
  external: ['react', 'react/jsx-runtime', '@opudoc/opicon-shared'],
});
