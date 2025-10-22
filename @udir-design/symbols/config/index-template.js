import { basename as _basename, extname } from 'node:path';

const defaultIndexTemplate = (paths) => {
  const exportEntries = paths.map((filePath) => {
    const basename = _basename(
      filePath.originalPath,
      extname(filePath.originalPath),
    );
    return `export { default as ${basename}Symbol } from './${basename}'`;
  });

  return exportEntries.join('\n');
};

export default defaultIndexTemplate;
