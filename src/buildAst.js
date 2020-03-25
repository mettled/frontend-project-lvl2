import { isObject, has, union } from 'lodash';

const properties = [
  {
    state: 'removed',
    check: (firstData, secondData, key) => has(firstData, key) && !has(secondData, key),
    getNodeData: (value) => ({ value }),
  },
  {
    state: 'added',
    check: (firstData, secondData, key) => !has(firstData, key) && has(secondData, key),
    getNodeData: (value1, value2) => ({ value: value2 }),
  },
  {
    state: 'parent',
    check: (firstData, secondData, key) => isObject(firstData[key]) && isObject(secondData[key]),
    getNodeData: (value1, value2, f) => ({ children: f(value1, value2) }),
  },
  {
    state: 'equal',
    check: (firstData, secondData, key) => firstData[key] === secondData[key],
    getNodeData: (value) => ({ value }),
  },
  {
    state: 'changed',
    check: (firstData, secondData, key) => (firstData[key] !== secondData[key]),
    getNodeData: (value1, value2) => ({ valueBefore: value1, valueAfter: value2 }),
  },
];

const buildAst = (dataBefore = {}, dataAfter = {}) => {
  const unionKeys = union([...Object.keys(dataBefore), ...Object.keys(dataAfter)]);
  return unionKeys.map((key) => {
    const { state, getNodeData } = properties.find(
      ({ check }) => check(dataBefore, dataAfter, key),
    );
    const valueBefore = dataBefore[key];
    const valueAfter = dataAfter[key];
    return { state, key, ...getNodeData(valueBefore, valueAfter, buildAst) };
  });
};

export default buildAst;
