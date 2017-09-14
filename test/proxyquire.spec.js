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
      });
      expect(a.default()).to.equal('hello mock');
      expect(a.valueOfB).to.equal('hello mock');
    });

    it('should clean up the module cache from mocks after errors', () => {
      const getC = () => proxyquire('./c', {
        './b': () => { throw new Error('Woops'); },
      });
      expect(getC).to.throw('Woops');

      const getA = () => proxyquire('./a', {});
      expect(getA).not.to.throw('Woops');
    });

    it('should clean up the module cache if one of the mocks provided doesnt exist', () => {
      const getC = () => proxyquire('./c', {
        './a': { default: () => 'hello mocks' },
        './b': { default: () => 'hello mocks' },
        './wat-this-path-does-not-exist': () => 'hello mock',
      });
      try {
        getC();
      } catch (e) {
        expect(e).to.exist;
      }

      const a = require('./a');
      const b = require('./b');
      expect(b.default()).to.equal('hello world');
      expect(a.default()).to.equal('hello world');
    });
  });
});
