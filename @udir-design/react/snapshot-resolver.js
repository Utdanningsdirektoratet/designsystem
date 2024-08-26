import path from 'path';

export default {
  resolveSnapshotPath: (testPath) => {
    const fileName = path.basename(testPath);
    return path.join('./src/__snapshots__', `${fileName}.snap`);
  },
  resolveTestPath: (snapshotFilePath, snapshotExtension) =>
    path.basename(snapshotFilePath, snapshotExtension),
  testPathForConsistencyCheck: 'example',
};
