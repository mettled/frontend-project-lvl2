const amountSpaces = (count) => ' '.repeat(count);
const PADDING = 4;

const typeField = [
  {
    check: (arg) => typeof arg !== 'object',
    getValue: (value) => value,
  },
  {
    check: (arg) => arg instanceof Object,
    getValue: (value, level) => `{\n${Object.entries(value).map(([key, field]) => (`${amountSpaces(level + PADDING)}${key}: ${field}`))}\n${amountSpaces(level)}}`,
  },
];

const checkItem = (value, level, f) => (
  typeField.find(({ check }) => check(value)).getValue(value, level + PADDING, f)
);

const config = {
  removed: (item, level, f) => (
    `${amountSpaces(level)}  - ${item.key}: ${checkItem(item.value, level, f)}`
  ),
  added: (item, level, f) => (
    `${amountSpaces(level)}  + ${item.key}: ${checkItem(item.value, level, f)}`
  ),
  parent: (item, level, f) => (
    `${amountSpaces(level)}    ${item.key}: {\n${f(item.children, level + PADDING)}\n${amountSpaces(level + PADDING)}}`
  ),
  equal: (item, level) => (
    `${amountSpaces(level)}    ${item.key}: ${item.value}`
  ),
  changed: (item, level, f) => (
    `${amountSpaces(level)}  - ${item.key}: ${checkItem(item.valueBefore, level, f)}\n${amountSpaces(level)}  + ${item.key}: ${checkItem(item.valueAfter, level, f)}`
  ),
};

const render = (data, level = 0) => data.map((item) => (config[item.state](item, level, render))).join('\n');

export default (data) => `{\n${render(data)}\n}`;
