import { createRollupConfig } from '../../scripts/rollup.shared.mjs';

export default createRollupConfig({
  entry: 'src/opicon-linear-react-native.ts',
  outputName: 'opicon-linear-react-native',
  external: ['react', 'react-native', 'react-native-svg', '@opudoc/opicon-shared'],
});
