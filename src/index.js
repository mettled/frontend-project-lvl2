import _ from 'lodash';
import parseContentFromFile from './parser'

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
  const dataFirst = parseContentFromFile(path1);
  const dataSecond = parseContentFromFile(path2);
  return getDiff(dataFirst, dataSecond);
};
