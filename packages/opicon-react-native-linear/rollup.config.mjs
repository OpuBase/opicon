import { createRollupConfig } from '../../scripts/rollup.shared.mjs';

export default createRollupConfig({
  entry: 'src/opicon-react-native-linear.ts',
  outputName: 'opicon-react-native-linear',
  external: ['react', 'react-native', 'react-native-svg', '@opudoc/opicon-shared'],
});
