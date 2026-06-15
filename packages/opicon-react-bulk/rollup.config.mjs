import { createRollupConfig } from '../../scripts/rollup.shared.mjs';

export default createRollupConfig({
  entry: 'src/opicon-react-bulk.ts',
  outputName: 'opicon-react-bulk',
  external: ['react', 'react/jsx-runtime', '@opudoc/opicon-shared'],
});
