import fs from 'fs';
import path from 'path';
import getParser from './parser';
import buildAst from './builderAst';
import getFormater from './formatters';


const readFile = (pathLocal) => {
  const pathToFile = path.resolve(path.normalize(pathLocal));

  const extname = path.extname(pathToFile);
  const dataFromFile = fs.readFileSync(pathToFile, 'utf8', 'r');
  return { dataFromFile, extname };
};

export default (path1, path2, format) => {
  const fileData1 = readFile(path1);
  const fileData2 = readFile(path2);

  const parsedContentFromFile1 = getParser[fileData1.extname](fileData1.dataFromFile);
  const parsedContentFromFile2 = getParser[fileData2.extname](fileData2.dataFromFile);

  const astTree = buildAst(parsedContentFromFile1, parsedContentFromFile2);
  return getFormater(format)(astTree);
};
