import { createRollupConfig } from '../../scripts/rollup.shared.mjs';

export default createRollupConfig({
  entry: 'src/opicon-bold-react-native.ts',
  outputName: 'opicon-bold-react-native',
  external: ['react', 'react-native', 'react-native-svg', '@opudoc/opicon-shared'],
});
