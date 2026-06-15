import { createRollupConfig } from '../../scripts/rollup.shared.mjs';

export default createRollupConfig({
  entry: 'src/opicon-react-twotone.ts',
  outputName: 'opicon-react-twotone',
  external: ['react', 'react/jsx-runtime', '@opudoc/opicon-shared'],
});
