import { isObject, isUndefined } from 'lodash';

const properties = [
  {
    state: 'removed',
    check: (value1, value2) => !isUndefined(value1) && isUndefined(value2),
    getField: (value) => ({ field: value }),
  },
  {
    state: 'added',
    check: (value1, value2) => isUndefined(value1) && !isUndefined(value2),
    getField: (value1, value2) => ({ field: value2 }),
  },
  {
    state: 'object',
    check: (value1, value2) => isObject(value1) && isObject(value2),
    getField: (value1, value2, f) => ({ field: f(value1, value2) }),
  },
  {
    state: 'equal',
    check: (value1, value2) => value1 === value2,
    getField: (value1) => ({ field: (value1) }),
  },
  {
    state: 'changed',
    check: (value1, value2) => (value1 !== value2),
    getField: (value1, value2) => ({ field: value1, field2: value2 }),
  },
];

const buildAst = (content1 = {}, content2 = {}) => {
  const getUnionKeys = new Set([...Object.keys(content1), ...Object.keys(content2)]);
  return [...getUnionKeys].map((name) => {
    const value1 = content1[name];
    const value2 = content2[name];
    const { state, getField } = properties.find(({ check }) => check(value1, value2));
    return { state, name, ...getField(value1, value2, buildAst) };
  });
};

export default buildAst;
