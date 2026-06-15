import { createRollupConfig } from '../../scripts/rollup.shared.mjs';

export default createRollupConfig({
  entry: 'src/opicon-broken-react-native.ts',
  outputName: 'opicon-broken-react-native',
  external: ['react', 'react-native', 'react-native-svg', '@opudoc/opicon-shared'],
});
