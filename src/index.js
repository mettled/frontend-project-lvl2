import parseContentFromFile from './parser';
import builderAst from './builderAst';
import getFormatedContent from './formatters';

export default (path1, path2, format) => {
  const contentFromFile1 = parseContentFromFile(path1);
  const contentFromFile2 = parseContentFromFile(path2);

  const astTree = builderAst(contentFromFile1, contentFromFile2);
  return getFormatedContent(format)(astTree);
};
