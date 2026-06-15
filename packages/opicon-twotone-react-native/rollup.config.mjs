import { createRollupConfig } from '../../scripts/rollup.shared.mjs';

export default createRollupConfig({
  entry: 'src/opicon-twotone-react-native.ts',
  outputName: 'opicon-twotone-react-native',
  external: ['react', 'react-native', 'react-native-svg', '@opudoc/opicon-shared'],
});
