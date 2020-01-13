import fs from 'fs';
import gendiff from '../src';

const path1 = `${__dirname}/../__fixture__/before.json`;
const path2 = `${__dirname}/../__fixture__/after.json`;
const result = fs.readFileSync(`${__dirname}/../__fixture__/result.js`, 'utf8', 'r');

const rez = 
`{
   host: hexlet.io
 + timeout: 20
 - timeout: 45
 - proxy: 123.234.53.22
 - follow: false
 + verbose: true
}`;

test('test1', () => {
  expect(gendiff(path1, path2)).toBe(rez);
});
