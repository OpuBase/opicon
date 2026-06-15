import { createRollupConfig } from '../../scripts/rollup.shared.mjs';

export default createRollupConfig({
  entry: 'src/opicon-bold-react.ts',
  outputName: 'opicon-bold-react',
  external: ['react', 'react/jsx-runtime', '@opudoc/opicon-shared'],
});
