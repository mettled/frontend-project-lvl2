import fs from 'fs';
import gendiff from '../src';

const path1 = `${__dirname}/../__fixture__/before.json`;
const path2 = `${__dirname}/../__fixture__/after.json`;
const result = fs.readFileSync(`${__dirname}/../__fixture__/result.txt`, 'utf8', 'r').trim();

test('test1', () => {
  expect(gendiff(path1, path2)).toBe(result);
});
