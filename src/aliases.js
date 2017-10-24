import path from 'path';
const aliases = [];

export function add(alias, dir) {
  aliases.push({
    alias,
    dir,
  });
}

export function remove(alias) {
  const index = aliases.findIndex(x => x.alias === alias);
  aliases.splice(index, 1);
}

export function get() {
  return aliases;
}

function absolute(request) {
  for (const { alias, dir } of aliases) {
    if (request.startsWith(alias + '/')) return path.join(dir, request.replace(alias + '/', ''));
    if (request === alias) return dir;
  }
  return undefined;
}

export function isAliased(request) {
  return !!absolute(request);
}

export function relative(from, to) {
  const p = path.relative(path.dirname(from), absolute(to));
  if (!p.startsWith('.')) {
    return './' + p;
  } else {
    return p;
  }
}
