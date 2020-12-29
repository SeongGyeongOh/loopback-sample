'use strict';
module.exports = function(options) {
  return function logError(err, req, res, next) {

    console.log('err: ', err);

    const _error = {};

    res.statusCode = 200;
    
    _error.status = err.statusCode;
    _error.error = (err.code && err.code !== '') ? err.code : err.message;
    
    res.send(_error).end();
  };
};
