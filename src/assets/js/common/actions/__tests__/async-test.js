import * as async from '../async';
import _ from 'lodash';

describe('async', function() {
  describe('::generateFunctionName', function() {
    it('should return a string', function() {
      expect(typeof async.generateFunctionName('foo', 'bar')).toBe('string');
    });

    it('should uppercase the first letter of the variation', function() {
      expect(async.generateFunctionName('foo', 'bar')).toBe('fooBar');
    });
  });

  describe('::generateActionType', function() {
    it('should return a string', function() {
      expect(typeof async.generateActionType('foo', 'bar', 'baz')).toBe('string');
    });

    it('should snake case with uppercased letters', function() {
      expect(async.generateActionType('foo', 'bar', 'baz')).toBe('FOO_BAR_BAZ');
    });
  });

  describe('::generateActions', function() {
    it('should generate 4 actions', function() {
      const actions = async.generateActions('foo', 'bar');
      expect(_.size(actions)).toBe(4);
      _.forOwn(actions, action => {
        expect(typeof action).toBe('function');
      });
    });
  });
});
