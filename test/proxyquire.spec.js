import { expect } from 'chai'
import proxyquire from '../src/proxyquire';
import Module from 'module'

describe('Module: proxyquire', () => {
  let a;
  let b;

  describe('without mocks', () => {
    it('should load the module as is', () => {
      const a = proxyquire('./a', {}).default;
      expect(a()).to.equal('hello world');
    });
  });

  describe('with mocks', () => {
    it('should load the mock instead', () => {
      const a = proxyquire('./a', {
        './b': () => 'hello mock',
      }).default;
      expect(a()).to.equal('hello mock');
    });
  });
});
