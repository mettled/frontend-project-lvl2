import fs from 'fs';
import path from 'path';
import parser from './parser';
import buildAst from './builderAst';
import getFormatedContent from './formatters';


const readFile = (pathLocal) => {
  const pathToFile = path.normalize(
    path.isAbsolute(pathLocal) ? pathLocal : path.resolve(__dirname, path.normalize(pathLocal)),
  );

  const extname = path.extname(pathToFile);
  const dataFromFile = fs.readFileSync(pathToFile, 'utf8', 'r');
  return { dataFromFile, extname };
};

export default (path1, path2, format) => {
  const fileData1 = readFile(path1);
  const fileData2 = readFile(path2);

  const parsedContentFromFile1 = parser(fileData1.dataFromFile, fileData1.extname);
  const parsedContentFromFile2 = parser(fileData2.dataFromFile, fileData2.extname);

  const astTree = buildAst(parsedContentFromFile1, parsedContentFromFile2);
  return getFormatedContent(format)(astTree);
};
