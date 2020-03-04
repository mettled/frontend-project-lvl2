import { isObject, flattenDeep } from 'lodash';

const getPath = (partPath, key) => (partPath === '' ? key : `${partPath}.${key}`);
const getValue = (value) => (isObject(value) ? '[complex value]' : value);

const config = {
  parent: (f, item, path) => f(item.children, path),
  added: (f, item, path) => `Property '${path}' was added with value: ${getValue(item.value)}`,
  equal: () => [],
  removed: (f, item, path) => `Property '${path}' was removed`,
  changed: (f, item, path) => `Property '${path}' was update: From ${getValue(item.valueBefore)} to ${getValue(item.valueAfter)}`,
};

const render = (data, pathItem = '') => (
  data.map((item) => {
    const { state, key } = item;
    const itemPath = getPath(pathItem, key);
    const nextRecord = config[state](render, item, itemPath);
    return nextRecord;
  })
);

export default (data) => flattenDeep(render(data)).join('\n');
