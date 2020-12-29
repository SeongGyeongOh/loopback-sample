'use strict';
module.exports = function() {
  return function tracker(req, res, next) {
    if (req.method.toUpperCase() !== 'OPTIONS') {
      const url = req.url.split('?')[0];
      var start = process.hrtime();
      res.once('finish', function() {
        var diff = process.hrtime(start);
        var ms = diff[0] * 1e3 + diff[1] * 1e-6;
        console.log('[%s-%s] on %s is %d ms', req.method, (new Date()).toISOString(), url, ms);
      });
    }
    next();
  };
};
