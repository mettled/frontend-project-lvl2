import { isObject, isUndefined } from 'lodash';

const properties = [
  {
    state: 'removed',
    check: (value1, value2) => !isUndefined(value1) && isUndefined(value2),
    getValue: (value) => ({ field: value }),
  },
  {
    state: 'added',
    check: (value1, value2) => isUndefined(value1) && !isUndefined(value2),
    getValue: (value1, value2) => ({ field: value2 }),
  },
  {
    state: 'equal',
    check: (value1, value2) => (isObject(value1) && isObject(value2)) || (value1 === value2),
    getValue: (value1, value2, f) => ({ field: f(value1, value2) }),
  },
  {
    state: 'changed',
    check: (value1, value2) => (value1 !== value2),
    getValue: (value1, value2) => ({ field: value1, field2: value2 }),
  },
];

const buildAST = (content1 = {}, content2 = {}) => {
  if (!isObject(content1)) {
    return content1;
  }
  const getUnionKeys = new Set([...Object.keys(content1), ...Object.keys(content2)]);
  return [...getUnionKeys].map((name) => {
    const value1 = content1[name];
    const value2 = content2[name];
    const { state, getValue } = properties.find(({ check }) => check(value1, value2));
    return { state, name, ...getValue(value1, value2, buildAST) };
  });
};

export default buildAST;
