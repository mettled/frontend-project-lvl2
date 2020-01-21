import fs from 'fs';
import gendiff from '../src';

test.each([
  ['json', 'before', 'after', 'resultJson_JsObject.txt', 'object'],
  ['json', 'before', 'after', 'resultJson_plain.txt', 'plain'],
  ['json', 'before', 'after', 'resultJson_json.txt', 'json'],
  ['json', 'before2', 'after2', 'resultJson2_JsObject.txt', 'object'],
  ['json', 'before2', 'after2', 'resultJson2_plain.txt', 'plain'],
  ['json', 'before2', 'after2', 'resultJson2_json.txt', 'json'],
  ['yaml', 'before', 'after', 'resultYaml_JsObject.txt', 'object'],
  ['yaml', 'before', 'after', 'resultYaml_plain.txt', 'plain'],
  ['yaml', 'before', 'after', 'resultYaml_json.txt', 'json'],
  ['yaml', 'before2', 'after2', 'resultYaml2_JsObject.txt', 'object'],
  ['yaml', 'before2', 'after2', 'resultYaml2_plain.txt', 'plain'],
  ['yaml', 'before2', 'after2', 'resultYaml2_json.txt', 'json'],
  ['ini', 'before', 'after', 'resultIni_JsObject.txt', 'object'],
  ['ini', 'before', 'after', 'resultIni_plain.txt', 'plain'],
  ['ini', 'before', 'after', 'resultIni_json.txt', 'json'],
  ['ini', 'before2', 'after2', 'resultIni2_JsObject.txt', 'object'],
  ['ini', 'before2', 'after2', 'resultIni2_plain.txt', 'plain'],
  ['ini', 'before2', 'after2', 'resultIni2_json.txt', 'json'],
])('test differences two %s files : %s and %s', (format, before, after, resultFile, resultFormat) => {
  const path1 = `${__dirname}/../__fixture__/${before}.${format}`;
  const path2 = `${__dirname}/../__fixture__/${after}.${format}`;
  const result = fs.readFileSync(`${__dirname}/../__fixture__/${resultFile}`, 'utf8', 'r').trim();


  expect(gendiff(path1, path2, resultFormat)).toBe(result);
});
