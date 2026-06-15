import { createRollupConfig } from '../../scripts/rollup.shared.mjs';

export default createRollupConfig({
  entry: 'src/opicon-twotone-react.ts',
  outputName: 'opicon-twotone-react',
  external: ['react', 'react/jsx-runtime', '@opudoc/opicon-shared'],
});
