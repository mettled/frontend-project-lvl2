const cs = (count) => ' '.repeat(count);

const typeField = [
  {
    check: (arg) => typeof arg !== 'object',
    renderField: (value) => value,
  },
  {
    check: (arg) => arg instanceof Array,
    renderField: (value, lvl, f) => `{\n${f(value, lvl)}${cs(lvl)}}`,
  },
  {
    check: (arg) => arg instanceof Object,
    renderField: (value, lvl) => `{\n${Object.entries(value).map(([name, field]) => (`${cs(lvl + 4)}${name}: ${field}`)).join('\n')}\n${cs(lvl)}}`,
  },
];

const checkItem = (value, f, lvl) => (
  typeField.find(({ check }) => check(value)).renderField(value, f, lvl)
);

const config = {
  removed: (f, item, lvl) => (
    `${cs(lvl)}  - ${item.name}: ${checkItem(item.field, lvl + 4)}\n`
  ),
  equal: (f, item, lvl) => (
    `${cs(lvl)}    ${item.name}: ${checkItem(item.field, lvl + 4, f)}\n`
  ),
  added: (f, item, lvl) => (
    `${cs(lvl)}  + ${item.name}: ${checkItem(item.field, lvl + 4)}\n`
  ),
  changed: (f, item, lvl) => (
    `${cs(lvl)}  - ${item.name}: ${checkItem(item.field, lvl + 4)}\n${cs(lvl)}  + ${item.name}: ${checkItem(item.field2, lvl + 4)}\n`
  ),
};

const render = (data, padding = 0) => (data.map((item) => (config[item.state](render, item, padding))).join(''));

export default (data) => `{\n${render(data)}}`;
