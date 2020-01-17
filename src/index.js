import parseContentFromFile from './parser';
import render from './render';

const properties = [
  {
    check: (value1, value2) => value1 instanceof Object && value2 instanceof Object,
    property: (f, name, value1, value2) => ({ state: 'object', name, value1: f(value1, value2) }),
  },
  {
    check: (value1, value2) => typeof value1 !== 'undefined' && typeof value2 === 'undefined',
    property: (f, name, value1) => ({ state: 'remote', name, value1: f(value1, value1) }),
  },
  {
    check: (value1, value2) => typeof value1 === 'undefined' && typeof value2 !== 'undefined',
    property: (f, name, value1, value2) => ({ state: 'add', name, value1: f(value2, value2) }),
  },
  {
    check: (value1, value2) => value1 !== value2,
    property: (f, name, value1, value2) => ({
      state: 'noEqual', name, value1: f(value1, value1), value2: f(value2, value2),
    }),
  },
  {
    check: (value1, value2) => value1 === value2,
    property: (f, name, value1) => ({ state: 'equal', name, value1: f(value1, value1) }),
  },
];

const getDiff = (dataFirst = {}, dataSecond = {}) => {
  if (!(dataFirst instanceof Object)) {
    return dataFirst;
  }

  if (!(dataSecond instanceof Object)) {
    return dataSecond;
  }

  const unionKeys = new Set([...Object.keys(dataFirst), ...Object.keys(dataSecond)]);
  const resultCompare = [...unionKeys].map((key) => {
    const value1 = dataFirst[key];
    const value2 = dataSecond[key];
    const { property } = properties.find(({ check }) => check(value1, value2));
    return property(getDiff, key, value1, value2);
  });
  return resultCompare;
};

export default (path1, path2) => {
  const dataFirst = parseContentFromFile(path1);
  const dataSecond = parseContentFromFile(path2);
  const a = getDiff(dataFirst, dataSecond);
  return `{\n${render(a, 0)}\n}`;
};
