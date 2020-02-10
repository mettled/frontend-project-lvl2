import { isObject } from 'lodash';

const getPath = (partPath, name) => (partPath === '' ? name : `${partPath}.${name}`);
const getValue = (value) => (isObject(value) ? '[complex value]' : value);

const config = {
  object: (f, item, path) => f(item.field, path),
  added: (f, item, path) => [`Property '${path}' was added with value: ${getValue(item.field)}`],
  equal: () => [],
  removed: (f, item, path) => [`Property '${path}' was removed`],
  changed: (f, item, path) => [`Property '${path}' was update: From ${getValue(item.field)} to ${getValue(item.field2)}`],
};

const render = (data, pathItem = '') => (
  data.reduce((acc, item) => {
    const { state, name } = item;
    const itemPath = getPath(pathItem, name);
    const nextRecord = config[state](render, item, itemPath);
    return [...acc, ...nextRecord];
  }, [])
);

export default (data) => render(data).join('\n');
