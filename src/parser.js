import yaml from 'js-yaml';
import fs from 'fs';
import path from 'path';
import ini from 'ini';

const options = {
  encoding: 'utf8',
  flag: 'r',
};

const typeFiles = {
  '.json': (content) => JSON.parse(content),
  '.yaml': (content) => yaml.safeLoad(content),
  '.ini': (content) => ini.parse(content),
};

export default (pathLocal) => {
  const pathToFile = path.isAbsolute(pathLocal) ? pathLocal
    : path.resolve(__dirname, path.normalize(pathLocal));
  const extname = path.extname(pathToFile);

  const contentFromFile = fs.readFileSync(path.normalize(pathToFile),
    options.encoding, options.flag);

  return typeFiles[extname](contentFromFile);
};
