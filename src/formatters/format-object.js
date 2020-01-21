import { isObject } from 'lodash';

const cs = (count) => ' '.repeat(count);
const hasChildren = (lvl, f, value) => (isObject(value) ? `{\n${f(value, lvl + 4)}${cs(lvl + 4)}}` : value);

const config = {
  removed: (f, item, lvl) => `${cs(lvl)}  - ${item.name}: ${hasChildren(lvl, f, item.field)}\n`,
  equal: (f, item, lvl) => `${cs(lvl)}    ${item.name}: ${hasChildren(lvl, f, item.field)}\n`,
  added: (f, item, lvl) => `${cs(lvl)}  + ${item.name}: ${hasChildren(lvl, f, item.field)}\n`,
  changed: (f, item, lvl) => `${cs(lvl)}  - ${item.name}: ${hasChildren(lvl, f, item.field)}\n ${cs(2)}   + ${item.name}:  ${hasChildren(lvl, f, item.field2)}\n`,
};

const render = (data, padding = 0) => {
  const contentJsObject = data.map((item) => {
    const { state } = item;
    const result = config[state](render, item, padding);
    return result;
  }).join('');
  return contentJsObject;
};

export default (data) => `{\n${render(data)}}`;
