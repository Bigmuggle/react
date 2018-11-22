const path = require('path')
const webpack = require('webpack')
const webpackConfig = require('webpack-merge')
const baseConfig = require('./webpack.base')
module.exports = webpackConfig(baseConfig, {
  mode: 'development',
  target: 'node', // 执行在node端
  entry: { // app.js就是作为打包的入口
    app: path.join(__dirname, '../client/server-entry.js')
  },
  externals: Object.keys(require('../package.json').dependencies),
  output: {
    filename: 'server-entry.js',
    path: path.join(__dirname, '../dist'),
    publicPath: '/public', // 打包出的统一前缀
    libraryTarget: 'commonjs2' // 打包的模块方案
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.API_BASE': '"http://127.0.0.0:3000"'
    })
  ]

})
