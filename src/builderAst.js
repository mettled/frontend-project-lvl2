import { isObject, isUndefined } from 'lodash';

const properties = [
  {
    state: 'removed',
    check: (value1, value2) => !isUndefined(value1) && isUndefined(value2),
    getNodeValue: (value) => ({ value }),
  },
  {
    state: 'added',
    check: (value1, value2) => isUndefined(value1) && !isUndefined(value2),
    getNodeValue: (value1, value2) => ({ value: value2 }),
  },
  {
    state: 'parent',
    check: (value1, value2) => isObject(value1) && isObject(value2),
    getNodeValue: (value1, value2, f) => ({ children: f(value1, value2) }),
  },
  {
    state: 'equal',
    check: (value1, value2) => value1 === value2,
    getNodeValue: (value) => ({ value }),
  },
  {
    state: 'changed',
    check: (value1, value2) => (value1 !== value2),
    getNodeValue: (value1, value2) => ({ valueBefore: value1, valueAfter: value2 }),
  },
];

const buildAst = (dataBefore = {}, dataAfter = {}) => {
  const unionKeys = new Set([...Object.keys(dataBefore), ...Object.keys(dataAfter)]);
  return [...unionKeys].map((name) => {
    const valueBefore = dataBefore[name];
    const valueAfter = dataAfter[name];
    const { state, getNodeValue } = properties.find(({ check }) => check(valueBefore, valueAfter));
    return { state, name, ...getNodeValue(valueBefore, valueAfter, buildAst) };
  });
};

export default buildAst;
