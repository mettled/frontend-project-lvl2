import { isObject } from 'lodash';

const hasChildren = (f, value, path) => (isObject(value) ? f(value, path) : '');
const getPath = (partPath, name) => (partPath === '' ? name : `${partPath}.${name}`);
const getValue = (value) => (isObject(value) ? '[complex value]' : value);

const config = {
  added: (f, item, path) => (`Property '${path}' was added with value: ${getValue(item.field)}\n`),
  equal: (f, item, path) => (hasChildren(f, item.field, path)),
  removed: (f, item, path) => (`Property '${path}' was removed\n`),
  changed: (f, item, path) => (`Property '${path}' was update: From ${getValue(item.field)} to ${getValue(item.field2)}\n`),
};

const render = (data, pathItem = '') => (
  data.map((item) => {
    const { state, name } = item;
    const itemPath = getPath(pathItem, name);

    return config[state](render, item, itemPath);
  }).join('')
);

export default (data) => render(data).trim();
