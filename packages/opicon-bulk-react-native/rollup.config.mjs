import { createRollupConfig } from '../../scripts/rollup.shared.mjs';

export default createRollupConfig({
  entry: 'src/opicon-bulk-react-native.ts',
  outputName: 'opicon-bulk-react-native',
  external: ['react', 'react-native', 'react-native-svg', '@opudoc/opicon-shared'],
});
