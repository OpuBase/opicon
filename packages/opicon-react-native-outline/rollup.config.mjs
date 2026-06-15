import { createRollupConfig } from '../../scripts/rollup.shared.mjs';

export default createRollupConfig({
  entry: 'src/opicon-react-native-outline.ts',
  outputName: 'opicon-react-native-outline',
  external: ['react', 'react-native', 'react-native-svg', '@opudoc/opicon-shared'],
});
