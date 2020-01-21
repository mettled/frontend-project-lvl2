import plain from './format-plain';
import object from './format-object';
import json from './format-json';

const formatType = { plain, object, json };

export default (format) => (formatType[format]);
