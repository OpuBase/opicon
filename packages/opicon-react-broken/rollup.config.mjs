import { createRollupConfig } from '../../scripts/rollup.shared.mjs';

export default createRollupConfig({
  entry: 'src/opicon-react-broken.ts',
  outputName: 'opicon-react-broken',
  external: ['react', 'react/jsx-runtime', '@opudoc/opicon-shared'],
});
