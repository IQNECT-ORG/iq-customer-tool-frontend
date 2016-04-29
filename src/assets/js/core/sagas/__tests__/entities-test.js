import { call, put, take, fork, select } from 'redux-saga/effects';
import * as entities from '../entities';
import _ from 'lodash';

describe('entities', function() {
  describe('::fetchEntity', function() {
    it('should', function() {
      const generator = entities.fetchEntity({
        entityName: 'Brand',
        entityActions: {
          fetchRequest: function() {
            return {
              type: 'FOO'
            }
          },
          fetchSuccess: function() {},
          fetchFailure: function() {}
        },
        apiFn: function() {},
        parser: function() {}
      }, {
        id: 1
      });

      
      expect(_.isEqual(generator.next().value, put({
        type: 'FOO'
      })));
    });
  });
});