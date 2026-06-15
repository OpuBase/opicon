import { createRollupConfig } from '../../scripts/rollup.shared.mjs';

export default createRollupConfig({
  entry: 'src/opicon-react-native-broken.ts',
  outputName: 'opicon-react-native-broken',
  external: ['react', 'react-native', 'react-native-svg', '@opudoc/opicon-shared'],
});
