import { createRollupConfig } from '../../scripts/rollup.shared.mjs';

export default createRollupConfig({
  entry: 'src/opicon-outline-react.ts',
  outputName: 'opicon-outline-react',
  external: ['react', 'react/jsx-runtime', '@opudoc/opicon-shared'],
});
