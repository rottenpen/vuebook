module.exports = {
    proxy: {
        '/api': {
          target: 'http://api.zhuishushenqi.com/',
          pathRewrite: {'^/api' : '/'},
          changeOrigin: true
        },
        '/chapter': {
          target: 'http://chapter2.zhuishushenqi.com/',
          pathRewrite: {'^/chapter' : '/chapter'},
          changeOrigin: true
        }
      }
  }