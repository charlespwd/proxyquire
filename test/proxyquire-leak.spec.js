import { expect } from 'chai'

describe('Module: proxyquire', () => {
  it('should not leak proxyquire into module', () => {
    const length = module.children.length;
    const proxyquire = require('../src/proxyquire');
    expect(module.children.length).to.equal(length);
  });

  it('should not leak mocks into proxyquire', () => {
    const proxyquire = require('../src/proxyquire');

    const beforeRequireLength = proxyquire.__parent__.children.length;
    proxyquire.default('./a', {
      './b': () => 'hello mock',
    });

    expect(proxyquire.__parent__.children.length).to.equal(
      beforeRequireLength
    );
  });
});
