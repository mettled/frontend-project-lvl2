import fs from 'fs';
import gendiff from '../src';

test.each([
  ['json', 'before', 'after', 'resultJson.txt'],
  ['json', 'before2', 'after2', 'resultJson2.txt'],
  ['yaml', 'before', 'after', 'resultYaml.txt'],
  ['ini', 'before', 'after', 'resultIni.txt'],
])('test different two %s files : %s and %s', (format, before, after, resultFile) => {
  const path1 = `${__dirname}/../__fixture__/${before}.${format}`;
  const path2 = `${__dirname}/../__fixture__/${after}.${format}`;
  const result = fs.readFileSync(`${__dirname}/../__fixture__/${resultFile}`, 'utf8', 'r').trim();


  expect(gendiff(path1, path2)).toBe(result);
});
