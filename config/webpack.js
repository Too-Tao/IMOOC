const path = require('path')

const resolve = p => path.resolve(__dirname, p)

export default {
  alias: {
    images: resolve('../src/assets/images')
  }
}