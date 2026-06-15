import { createRollupConfig } from '../../scripts/rollup.shared.mjs';

export default createRollupConfig({
  entry: 'src/opicon-react-outline.ts',
  outputName: 'opicon-react-outline',
  external: ['react', 'react/jsx-runtime', '@opudoc/opicon-shared'],
});
