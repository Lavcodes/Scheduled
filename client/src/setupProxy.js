const proxy = require('http-proxy-middleware');
module.exports = function (app) {
  app.use(
    ['/teachers', '/events'],
    proxy({
      target: 'http://localhost:5000',
      changeOrigin : true,
    })
  );
};

