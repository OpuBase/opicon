import { createRollupConfig } from '../../scripts/rollup.shared.mjs';

export default createRollupConfig({
  entry: 'src/opicon-react-native-twotone.ts',
  outputName: 'opicon-react-native-twotone',
  external: ['react', 'react-native', 'react-native-svg', '@opudoc/opicon-shared'],
});
