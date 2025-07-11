import { getJestConfig } from 'storybook/test-runner';

const defaultConfig = getJestConfig();

/** @type {typeof defaultConfig}  */
const config = {
  ...defaultConfig,
  rootDir: './',
  snapshotSerializers: [
    // Sets up the custom serializer to preprocess the HTML before it's passed onto the test-runner
    './snapshot-serializer.js',
    ...defaultConfig.snapshotSerializers,
  ],
};

export default config;
