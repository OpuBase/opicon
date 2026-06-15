import { createRollupConfig } from '../../scripts/rollup.shared.mjs';

export default createRollupConfig({
  entry: 'src/opicon-linear-react.ts',
  outputName: 'opicon-linear-react',
  external: ['react', 'react/jsx-runtime', '@opudoc/opicon-shared'],
});
