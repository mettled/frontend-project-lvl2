const cs = (count) => ' '.repeat(count);
const getRender = (value, lvl, renderFunc) => (Array.isArray(value) ? `{\n${renderFunc(value, lvl + 2)}\n${cs(lvl + 2)}}` : value);

const config = {
  object: (lv, f, name, value1) => `${cs(lv + 2)}${name}: ${getRender(value1, lv, f)}`,
  remote: (lv, f, name, value1) => `${cs(lv)}- ${name}: ${getRender(value1, lv, f)}`,
  add: (lv, f, name, value1) => `${cs(lv)}+ ${name}: ${getRender(value1, lv, f)}`,
  equal: (lv, f, name, value1) => `${cs(lv + 2)}${name}: ${getRender(value1, lv, f)}`,
  noEqual: (lv, f, name, value1, value2) => (
    `${cs(lv)}- ${name}: ${getRender(value1, lv, f)}\n${cs(lv)}+ ${name}: ${getRender(value2, lv, f)}`
  ),
};

const render = (data, lvl) => {
  const level = lvl + 2;
  return data.map((item) => {
    const {
      state, name, value1, value2,
    } = item;
    return Array.isArray(value1) ? `${config[state](level, render, name, value1)}`
      : config[state](level, render, name, value1, value2);
  }).join('\n');
};

export default render;
