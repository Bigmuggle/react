const ejs = require('ejs')
const serialize = require('serialize-javascript')
const asyncBootstrap = require('react-async-bootstrapper')
const ReactDomServer = require('react-dom/server')
const Helmet = require('react-helmet').default

const SheetsRegistry = require('react-jss').SheetsRegistry
const create = require('jss').create
const preset = require('jss-preset-default').default
const createGenerateClassName = require('material-ui/styles/createGenerateClassName').default
const createMuiTheme = require('material-ui/styles').createMuiTheme
const colors = require('material-ui/colors')

const getStoreState = (stores) => {
  return Object.keys(stores).reduce((result, storeName) => {
    result[storeName] = stores[storeName].toJson()
    return result
  }, {})
}
module.exports = (bundle, template, req, res) => {
  return new Promise((resolve, reject) => {
    const creatStoreMap = bundle.creatStoreMap
    const createApp = bundle.default
    const routerContext = {}
    const stores = creatStoreMap()
    const sheetsRegistry = new SheetsRegistry()
    const jss = create(preset())
    jss.options.createGenerateClassName = createGenerateClassName
    const theme = createMuiTheme({
      palette: {
        primary: colors.blue,
        secondary: colors.pink,
        type: 'light'
      }
    })
    // const generateClassName = createGenerateClassName()
    const app = createApp(stores, routerContext, sheetsRegistry, jss, theme, req.url)

    asyncBootstrap(app).then(() => {
      if (routerContext.url) {
        res.status(302).setHeader('Location', routerContext.url)
        res.send()
        return
      }
      const helmet = Helmet.rewind()
      const state = getStoreState(stores)
      const content = ReactDomServer.renderToString(app)

      const html = ejs.render(template, {
        appString: content,
        initialState: serialize(state),
        meta: helmet.meta.toString(), // SEO标签优化
        materialCss: sheetsRegistry.toString(),
        title: helmet.title.toString(),
        link: helmet.link.toString(),
        style: helmet.style.toString()

      })
      res.send(html)
      // res.send(template.replace('<!-- -->', content))
      resolve()
    }).catch(reject)
  })
}
