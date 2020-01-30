import parseContentFromFile from './parser';
import builderAst from './builderAst';
import formatters from './formatters';

export default (path1, path2, format) => {
  const contentFromFile1 = parseContentFromFile(path1);
  const contentFromFile2 = parseContentFromFile(path2);

  const astTree = builderAst(contentFromFile1, contentFromFile2);
  return formatters(format)(astTree);
};
