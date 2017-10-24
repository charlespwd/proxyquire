'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.add = add;
exports.remove = remove;
exports.get = get;
exports.isAliased = isAliased;
exports.relative = relative;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const aliases = [];

function add(alias, dir) {
  aliases.push({
    alias,
    dir
  });
}

function remove(alias) {
  const index = aliases.findIndex(x => x.alias === alias);
  aliases.splice(index, 1);
}

function get() {
  return aliases;
}

function absolute(request) {
  for (const { alias, dir } of aliases) {
    if (request.startsWith(alias + '/')) return _path2.default.join(dir, request.replace(alias + '/', ''));
    if (request === alias) return dir;
  }
  return undefined;
}

function isAliased(request) {
  return !!absolute(request);
}

function relative(from, to) {
  const p = _path2.default.relative(_path2.default.dirname(from), absolute(to));
  if (!p.startsWith('.')) {
    return './' + p;
  } else {
    return p;
  }
}