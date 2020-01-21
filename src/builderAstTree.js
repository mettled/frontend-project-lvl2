import { isObject, isUndefined } from 'lodash';

const properties = [
  {
    state: 'removed',
    check: (value1, value2) => !isUndefined(value1) && isUndefined(value2),
    value: (f, value) => ({ field: f(value, value) }),
  },
  {
    state: 'added',
    check: (value1, value2) => isUndefined(value1) && !isUndefined(value2),
    value: (f, value1, value2) => ({ field: f(value2, value2) }),
  },
  {
    state: 'equal',
    check: (value1, value2) => (isObject(value1) && isObject(value2)) || (value1 === value2),
    value: (f, value1, value2) => ({ field: f(value1, value2) }),
  },
  {
    state: 'changed',
    check: (value1, value2) => (value1 !== value2),
    value: (f, value1, value2) => ({ field: f(value1, value1), field2: f(value2, value2) }),
  },
];

const buildASTTree = (content1 = {}, content2 = {}) => {
  if (!isObject(content1)) {
    return content1;
  }
  const unionKeys = new Set([...Object.keys(content1), ...Object.keys(content2)]);
  return [...unionKeys].map((name) => {
    const value1 = content1[name];
    const value2 = content2[name];
    const { state, value } = properties.find(({ check }) => check(value1, value2));
    return { state, name, ...value(buildASTTree, value1, value2) };
  });
};

export default (contentFile1, contentFile2) => (buildASTTree(contentFile1, contentFile2));
