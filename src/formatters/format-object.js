const amountSpaces = (count) => ' '.repeat(count);
const PADDING = 4;

const typeField = [
  {
    check: (arg) => typeof arg !== 'object',
    getValue: (value) => value,
  },
  {
    check: (arg) => arg instanceof Object,
    getValue: (value, depth) => `{\n${Object.entries(value).map(([key, field]) => (`${amountSpaces(depth + PADDING)}${key}: ${field}`))}\n${amountSpaces(depth)}}`,
  },
];

const checkItem = (value, depth, f) => (
  typeField.find(({ check }) => check(value)).getValue(value, depth + PADDING, f)
);

const config = {
  removed: (item, depth, f) => (
    `${amountSpaces(depth)}  - ${item.key}: ${checkItem(item.value, depth, f)}`
  ),
  added: (item, depth, f) => (
    `${amountSpaces(depth)}  + ${item.key}: ${checkItem(item.value, depth, f)}`
  ),
  parent: (item, depth, f) => (
    `${amountSpaces(depth)}    ${item.key}: {\n${f(item.children, depth + PADDING)}\n${amountSpaces(depth + PADDING)}}`
  ),
  equal: (item, depth) => (
    `${amountSpaces(depth)}    ${item.key}: ${item.value}`
  ),
  changed: (item, depth, f) => (
    `${amountSpaces(depth)}  - ${item.key}: ${checkItem(item.valueBefore, depth, f)}\n${amountSpaces(depth)}  + ${item.key}: ${checkItem(item.valueAfter, depth, f)}`
  ),
};

const render = (data, depth = 0) => data.map((item) => (config[item.state](item, depth, render))).join('\n');

export default (data) => `{\n${render(data)}\n}`;
