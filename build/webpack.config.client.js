const path = require('path')
const webpack = require('webpack')
const webpackConfig = require('webpack-merge')
const baseConfig = require('./webpack.base')
const HTMLPlugin = require('html-webpack-plugin')
// const uglify = require('uglifyjs-webpack-plugin')
const isDev = process.env.NODE_ENV === 'development'

const config = webpackConfig(baseConfig, {
  mode: 'development',
  entry: { // app.js就是作为打包的入口
    app: path.join(__dirname, '../client/app.js')
  },
  output: {
    filename: '[name].[hash].js',
    path: path.join(__dirname, '../dist'),
    publicPath: '/public/'
  },
  plugins: [
    //   new uglify()
    new HTMLPlugin({
      filename: 'index.html', // 生成文件的文件名
      template: path.join(__dirname, '../client/template.html') // 指定生成的文件模板，此处是html 还可以有jade，ejs等等，不过自定义模板需要安装对应的loader
      //  inject: 'head'       //生成的js加入到index的head之中
    })
  ],
  performance: {
    hints: false
  }
})
if (isDev) {
  config.entry = {
    app: [
      'react-hot-loader/patch',
      path.join(__dirname, '../client/app.js')
    ]
  }
  config.devServer = {
    host: '0.0.0.0',
    port: '8888',
    contentBase: path.join(__dirname, '../dist'),
    hot: true,
    overlay: { // 报错页面显示
      errors: true
    },
    publicPath: '/public',
    historyApiFallback: {
      index: '/public/index.html'
    },
    proxy: {
      '/api': 'http://localhost:3333'
    }
  }
  config.plugins.push(new webpack.HotModuleReplacementPlugin())
}
module.exports = config
