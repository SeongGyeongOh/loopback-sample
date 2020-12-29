'use strict';
module.exports = function() {
  const app = require('../server');
  const slog = require('../logger').slog;
  const url = require('url');

  return (req, res, next) => {
    const User = app.models.user;

    const tempUrl = req.method + ' ' + req.url.split('?')[0];
    const _headers = JSON.stringify((req.headers) ? req.headers : {});
    const _query = JSON.stringify((req.query) ? req.query : {});
    const _body = JSON.stringify((req.body) ? req.body : {});
    const _url = JSON.stringify((tempUrl) ? tempUrl : {});
    const at = JSON.stringify(req.accessToken);
    slog.info(_url + ' ' + _headers + ' ' + _query + ' ' + _body + ' ' + at);
    
    if (req.accessToken) {
      User.findOne({where: {id: req.accessToken.userId}}, function(err, user) {
        if (user) {
         req['userInfo'] = user;

         return next();
       } else {
         return next(utils.e(401, 'no user'));
       }
      });
    } else {
      return next();
    }
  };
};
