import { isObject } from 'lodash';

const makeIndent = (count) => ' '.repeat(count);
const PADDING = 4;

const getValue = (value, level) => {
  if (!isObject(value)) {
    return value;
  }

  const convertedValue = Object
    .entries(value)
    .map(([key, field]) => (`${makeIndent(level + PADDING)}${key}: ${field}`));

  return `{\n${convertedValue}\n${makeIndent(level)}}`;
};

const config = {
  removed: (item, level) => (
    `${makeIndent(level)}  - ${item.key}: ${getValue(item.value, level + PADDING)}`
  ),
  added: (item, level) => (
    `${makeIndent(level)}  + ${item.key}: ${getValue(item.value, level + PADDING)}`
  ),
  parent: (item, level, f) => (
    `${makeIndent(level)}    ${item.key}: {\n${f(item.children, level + PADDING)}\n${makeIndent(level + PADDING)}}`
  ),
  equal: (item, level) => (
    `${makeIndent(level)}    ${item.key}: ${item.value}`
  ),
  changed: (item, level) => (
    `${makeIndent(level)}  - ${item.key}: ${getValue(item.valueBefore, level + PADDING)}\n${makeIndent(level)}  + ${item.key}: ${getValue(item.valueAfter, level + PADDING)}`
  ),
};

const render = (data, level = 0) => data.map((item) => (config[item.state](item, level, render))).join('\n');

export default (data) => `{\n${render(data)}\n}`;
