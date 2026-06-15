import { createRollupConfig } from '../../scripts/rollup.shared.mjs';

export default createRollupConfig({
  entry: 'src/opicon-react-linear.ts',
  outputName: 'opicon-react-linear',
  external: ['react', 'react/jsx-runtime', '@opudoc/opicon-shared'],
});
