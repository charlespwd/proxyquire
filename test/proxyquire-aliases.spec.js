import { expect } from 'chai'

describe('Unit: proxyquire with module aliases', () => {
  let a;
  let b;
  let proxyquire;

  it('should remember aliases across multiple require calls', () => {
    proxyquire = require('../src/proxyquire');
    expect(proxyquire.getAliases()).to.eql([])
    proxyquire.alias('test', __dirname);
    expect(proxyquire.getAliases()).to.eql([{ alias: 'test', dir: __dirname }])

    proxyquire = require('../src/proxyquire'); // reload!
    expect(proxyquire.getAliases()).to.eql([{ alias: 'test', dir: __dirname }])
    proxyquire.unalias('test', __dirname);
  });

  it('should let you require modules with path aliases', () => {
    proxyquire = require('../src/proxyquire');
    proxyquire.alias('test', __dirname);
    const d = proxyquire.default('./d-with-aliased-import', {
      'test/a': () => 'mock!',
    });

    expect(d.default()).to.equal('mock!');
    proxyquire.unalias('test');
  });

  it('should let you mock aliases', () => {
    proxyquire = require('../src/proxyquire');
    proxyquire.alias('test', __dirname);

    const d = proxyquire.default('./d-with-aliased-index-import', {
      'test': () => 'mock!',
    });

    expect(d.default()).to.equal('mock!');
    proxyquire.unalias('test');
  });
});
