const ejs = require('ejs')
const serialize = require('serialize-javascript')
const asyncBootstrap = require('react-async-bootstrapper')
const ReactDomServer = require('react-dom/server')
const Helmet = require('react-helmet').default

const SheetsRegistry = require('jss')
const createGenerateClassName = require('@material-ui/core/styles/createGenerateClassName')
const creatMuiTheme = require('@material-ui/core/styles/createMuiTheme')
const colors = require('@material-ui/core/colors')

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
    const generateClassName = createGenerateClassName()
    // Create a sheetsManager instance.
    const sheetsManager = new Map()

    const theme = creatMuiTheme({
      palette: {
        primary: colors.pink,
        accent: colors.lightBlue,
        type: 'light'
      }
    })
    const app = createApp(stores, routerContext, req.url, sheetsRegistry, generateClassName, sheetsManager, theme)

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
        title: helmet.title.toString(),
        link: helmet.link.toString(),
        style: helmet.style.toString(),
        materialCss: SheetsRegistry.toString()
      })
      res.send(html)
      // res.send(template.replace('<!-- -->', content))
      resolve()
    }).catch(reject)
  })
}
