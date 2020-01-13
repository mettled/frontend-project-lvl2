import fs from 'fs';
import path from 'path';
import _ from 'lodash';

const settingFile = {
  encoding: 'utf8',
  flag: 'r',
};

const getObjectFromFile = (pathLocal, options) => {
  const pathURL = path.isAbsolute(pathLocal) ? pathLocal
    : path.resolve(__dirname, 'files/', path.basename(pathLocal));
  return JSON.parse(fs.readFileSync(path.normalize(pathURL), options.encoding, options.flag));
};

const getDifferByValue = (value, compareObject1, compareObject2) => {
  if (_.has(compareObject1, value) === _.has(compareObject2, value)) {
    return compareObject1[value] === compareObject2[value]
      ? `   ${value}: ${compareObject2[value]}`
      : ` + ${value}: ${compareObject2[value]}\n - ${value}: ${compareObject1[value]}`;
  }
  if (_.has(compareObject2, value)) {
    return ` + ${value}: ${compareObject2[value]}`;
  }
  return ` - ${value}: ${compareObject1[value]}`;
};

const getDiff = (dataFirst, dataSecond) => {
  const unionKeys = new Set([...Object.keys(dataFirst), ...Object.keys(dataSecond)]);
  const resultCompare = [...unionKeys].reduce((acc, currentValue) => (
    `${acc}\n${getDifferByValue(currentValue, dataFirst, dataSecond)}`
  ), '');
  return `{${resultCompare}\n}`;
};

export default (path1, path2) => {
  const dataFirst = getObjectFromFile(path1, settingFile);
  const dataSecond = getObjectFromFile(path2, settingFile);
  return getDiff(dataFirst, dataSecond);
};
