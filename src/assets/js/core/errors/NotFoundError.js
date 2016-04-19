
function NotFoundError(message) {
  this.message = message;
  this.stack = Error().stack;
};

NotFoundError.prototype = Object.create(Error.prototype);
NotFoundError.prototype.name = 'NotFoundError';

export default NotFoundError;