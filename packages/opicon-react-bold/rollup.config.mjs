import { createRollupConfig } from '../../scripts/rollup.shared.mjs';

export default createRollupConfig({
  entry: 'src/opicon-react-bold.ts',
  outputName: 'opicon-react-bold',
  external: ['react', 'react/jsx-runtime', '@opudoc/opicon-shared'],
});
