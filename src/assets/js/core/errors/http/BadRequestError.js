
function BadRequestError(message) {
  this.message = message;
  this.stack = Error().stack;
};

BadRequestError.prototype = Object.create(Error.prototype);
BadRequestError.prototype.name = 'BadRequestError';

export default BadRequestError;