import fs from 'fs';
import path from 'path';
import getParser from './getParser';
import buildAst from './buildAst';
import getFormater from './formatters';


const readFile = (localPath) => {
  const absolutePath = path.resolve(path.normalize(localPath));
  const fileExtention = path.extname(absolutePath).slice(1);
  const fileData = fs.readFileSync(absolutePath, 'utf8', 'r');

  return getParser(fileExtention)(fileData);
};

export default (path1, path2, format) => {
  const fileData1 = readFile(path1);
  const fileData2 = readFile(path2);
  const astTree = buildAst(fileData1, fileData2);

  return getFormater(format)(astTree);
};
