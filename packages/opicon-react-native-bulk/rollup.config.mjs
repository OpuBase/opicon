import { createRollupConfig } from '../../scripts/rollup.shared.mjs';

export default createRollupConfig({
  entry: 'src/opicon-react-native-bulk.ts',
  outputName: 'opicon-react-native-bulk',
  external: ['react', 'react-native', 'react-native-svg', '@opudoc/opicon-shared'],
});
