import * as crud from '../crud';

describe('crud', function() {
  describe('::removeTrailingSlash', function() {
    it('should remove trailing slash', function() {
      expect(crud.removeTrailingSlash('/hello/')).toBe('/hello');
    });
  });
});