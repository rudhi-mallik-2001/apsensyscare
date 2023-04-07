const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/site_user',
    createProxyMiddleware({
      target: 'http://localhost:2306',
      changeOrigin: true,
    })
  );
};
