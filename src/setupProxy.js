const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    ['/api'],
    createProxyMiddleware({
      target: 'https://192.168.10.3:7000/',
      secure:false,
      changeOrigin: true,
    })
  );
};