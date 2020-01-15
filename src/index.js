import parseContentFromFile from './parser';

const properties = [
  {
    state: 'object',
    check: (value1, value2) => value1 instanceof Object && value2 instanceof Object,
    property: (name, value1, value2) => ({ state: 'object', name, value1: getDiff(value1, value2) }),
  },
  {
    state: 'remote',
    check: (value1, value2) => typeof value1 !== 'undefined' && typeof value2 === 'undefined',
    property: (name, value1) => ({ name, value1 }),
  },
  {
    state: 'add',
    check: (value1, value2) => typeof value1 === 'undefined' && typeof value2 !== 'undefined',
    property: (name, value1, value2) => ({ name, value1: value2 }),
  },
  {
    state: 'noEqual',
    check: (value1, value2) => value1 !== value2,
    property: (name, value1, value2) => ({ name, value1, value2 }),
  },
  {
    state: 'equal',
    check: (value1, value2) => value1 === value2,
    property: (name, value1) => ({ name, value1 }),
  },
];

const checkValueByChildren = (value, actionFunction) => {
  console.log('check', (value instanceof Object), value)
  return (value instanceof Object) ? actionFunction(value) : value
};


const render = (data) => {
  const resultString = [...data].map((item) => {
    const { state, property: { name, value1, value2 } } = item;
       console.log('1 --- \n', state, name, value1, value2, item )
    let res ;
    if (state === 'object') {
      res = `${name}: {${checkValueByChildren(value1, render)}\n}` 
    }
    if (state === 'remote') {
      res = `- ${name}: ${checkValueByChildren(value1, render)}`;

    }

   if (state === 'add') {
      res =`+ ${name}: ${checkValueByChildren(value1, render)}`;
    }

   if (state === 'noEqual') {
       res =`- ${name}: ${checkValueByChildren(value1, render)}\n+ ${name}: ${checkValueByChildren(value2, render)}
     `;
    }

   if (state === 'equal') {
      res =` ${name}: ${checkValueByChildren(value1, render)}`;
    }
    console.log('res ----\n ',`\n${res}\n`);
return res;


  }).join('\n');
  console.log('resStr - \n ', resultString);
  return resultString;
}

const getDiff = (dataFirst, dataSecond) => {
  const unionKeys = new Set([...Object.keys(dataFirst), ...Object.keys(dataSecond)]);
  const resultCompare = [...unionKeys].map((key) => {
    const value1 = dataFirst[key];
    const value2 = dataSecond[key];
    const { state, property } = properties.find(({ check }) => check(value1, value2));
    return { state, property: property(key, value1, value2) };
  });
  return resultCompare;
};

export default (path1, path2) => {
  const dataFirst = parseContentFromFile(path1);
  const dataSecond = parseContentFromFile(path2);
  const a = getDiff(dataFirst, dataSecond);
  const b = render([...a]);
  return b;
};
