import fs from 'fs';
import path from 'path';
import gendiff from '../src';

const getPathToFile = (fileName, fileFormat) => path.join(__dirname, '../__fixture__', `${fileName}.${fileFormat}`);

test.each([
  ['json', 'before2', 'after2', 'result_object', 'object'],
  ['yaml', 'before2', 'after2', 'result_plain', 'plain'],
  ['ini', 'before2', 'after2', 'result_json', 'json'],
])('test differences two %s files : %s and %s', (format, before, after, resultFile, resultFormat) => {
  const path1 = getPathToFile(before, format);
  const path2 = getPathToFile(after, format);
  const result = fs.readFileSync(getPathToFile(resultFile, 'txt'), 'utf8', 'r').trim();

  expect(gendiff(path1, path2, resultFormat)).toBe(result);
});
