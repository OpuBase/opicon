import { createRollupConfig } from '../../scripts/rollup.shared.mjs';

export default createRollupConfig({
  entry: 'src/opicon-react-native-bold.ts',
  outputName: 'opicon-react-native-bold',
  external: ['react', 'react-native', 'react-native-svg', '@opudoc/opicon-shared'],
});
