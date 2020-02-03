import yaml from 'js-yaml';
import fs from 'fs';
import path from 'path';
import ini from 'ini';

const extensionFiles = {
  '.json': JSON.parse,
  '.yaml': yaml.safeLoad,
  '.ini': ini.parse,
};

export default (pathLocal) => {
  const pathToFile = path.normalize(
    path.isAbsolute(pathLocal) ? pathLocal : path.resolve(__dirname, path.normalize(pathLocal)),
  );

  const extname = path.extname(pathToFile);
  const contentFromFile = fs.readFileSync(pathToFile, 'utf8', 'r');

  return extensionFiles[extname](contentFromFile);
};
