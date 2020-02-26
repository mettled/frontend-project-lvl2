import { isObject, has } from 'lodash';

const properties = [
  {
    state: 'removed',
    check: (dataFirst, dataSecond, key) => has(dataFirst, key) && !has(dataSecond, key),
    getNodeData: (value) => ({ value }),
  },
  {
    state: 'added',
    check: (dataFirst, dataSecond, key) => !has(dataFirst, key) && has(dataSecond, key),
    getNodeData: (value1, value2) => ({ value: value2 }),
  },
  {
    state: 'parent',
    check: (dataFirst, dataSecond, key) => isObject(dataFirst[key]) && isObject(dataSecond[key]),
    getNodeData: (value1, value2, f) => ({ children: f(value1, value2) }),
  },
  {
    state: 'equal',
    check: (dataFirst, dataSecond, key) => dataFirst[key] === dataSecond[key],
    getNodeData: (value) => ({ value }),
  },
  {
    state: 'changed',
    check: (dataFirst, dataSecond, key) => (dataFirst[key] !== dataSecond[key]),
    getNodeData: (value1, value2) => ({ valueBefore: value1, valueAfter: value2 }),
  },
];

const astBuild = (dataBefore = {}, dataAfter = {}) => {
  const unionKeys = new Set([...Object.keys(dataBefore), ...Object.keys(dataAfter)]);
  return [...unionKeys].map((key) => {
    const { state, getNodeData } = properties.find(
      ({ check }) => check(dataBefore, dataAfter, key),
    );
    const valueBefore = dataBefore[key];
    const valueAfter = dataAfter[key];
    return { state, key, ...getNodeData(valueBefore, valueAfter, astBuild) };
  });
};

export default astBuild;
