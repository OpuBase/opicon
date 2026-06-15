import { createRollupConfig } from '../../scripts/rollup.shared.mjs';

export default createRollupConfig({
  entry: 'src/opicon-broken-react.ts',
  outputName: 'opicon-broken-react',
  external: ['react', 'react/jsx-runtime', '@opudoc/opicon-shared'],
});
