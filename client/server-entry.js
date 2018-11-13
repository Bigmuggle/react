import React from 'react'
import { StaticRouter } from 'react-router-dom'
import { Provider, useStaticRendering } from 'mobx-react'
import { JssProvider } from 'react-jss'
import { MuiThemeProvider } from '@material-ui/core/styles'
import App from './views/App'
import { creatStoreMap } from './store/store'


// 让mobx在服务端渲染的时候不会重复的数据变换
useStaticRendering(true)

export default (stores, routerContext, url, sheetsRegistry, generateClassName, theme, sheetsManager) => (
  <Provider {...stores}>
    <StaticRouter context={routerContext} location={url}>
      <JssProvider registry={sheetsRegistry} generateClassName={generateClassName}>
        <MuiThemeProvider theme={theme} sheetsManager={sheetsManager}>
          <App />
        </MuiThemeProvider>
      </JssProvider>
    </StaticRouter>
  </Provider>
)

export { creatStoreMap }
