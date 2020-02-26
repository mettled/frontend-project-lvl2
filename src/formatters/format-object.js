const cs = (count) => ' '.repeat(count);
const PADDING = 4;

const typeField = [
  {
    check: (arg) => typeof arg !== 'object',
    getValue: (value) => value,
  },
  {
    check: (arg) => arg instanceof Object,
    getValue: (value, offset) => [`{\n${Object.entries(value).map(([key, field]) => (`${cs(offset + PADDING)}${key}: ${field}`))}\n${cs(offset)}}`],
  },
];

const checkItem = (value, offset, f) => (
  typeField.find(({ check }) => check(value)).getValue(value, offset + PADDING, f)
);

const config = {
  removed: (item, offset, f) => (
    [`${cs(offset)}  - ${item.key}: ${checkItem(item.value, offset, f)}`]
  ),
  added: (item, offset, f) => (
    [`${cs(offset)}  + ${item.key}: ${checkItem(item.value, offset, f)}`]
  ),
  parent: (item, offset, f) => (
    [`${cs(offset)}    ${item.key}: {\n${f(item.children, offset + PADDING)}\n${cs(offset + PADDING)}}`]
  ),
  equal: (item, offset) => (
    [`${cs(offset)}    ${item.key}: ${item.value}`]
  ),
  changed: (item, offset, f) => (
    [`${cs(offset)}  - ${item.key}: ${checkItem(item.valueBefore, offset, f)}`, `${cs(offset)}  + ${item.key}: ${checkItem(item.valueAfter, offset, f)}`]
  ),
};

const render = (data, offset = 0) => (
  data.reduce((acc, item) => ([...acc, ...config[item.state](item, offset, render)]), [])
).join('\n');

export default (data) => `{\n${render(data)}\n}`;
