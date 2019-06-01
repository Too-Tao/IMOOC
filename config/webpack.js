const path = require('path')

const resolve = p => path.resolve(__dirname, p)

export default {
  alias: {
    images: resolve('../src/assets/images'),
    routes: resolve('./routes'),
    utils: resolve('../src/utils'),
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://47.100.206.216:40100',
        pathRewrite: { '^/api': '' },
        changeOrigin: true
      }
    }
  }
}