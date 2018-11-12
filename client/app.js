import React from 'react'
import ReactDom from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { AppContainer } from 'react-hot-loader' //eslint-disable-line
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { lightBlue, pink } from '@material-ui/core/colors'
import { Provider } from 'mobx-react'
import AppState from './store/app.state'
import App from './views/App'

const theme = createMuiTheme({
  palette: {
    primary: lightBlue,
    accent: pink,
    type: 'light',
  },

})

const initialState = window.__INITIAL__STATE__ || {} // eslint-disable-line
const root = document.getElementById('root')
const render = (Component) => {
  const readerMethod = module.hot ? ReactDom.render : ReactDom.hydrate
  readerMethod(
    <AppContainer>
      <Provider appState={new AppState(initialState.appState)}>
        <BrowserRouter>
          <MuiThemeProvider theme={theme}>
            <Component />
          </MuiThemeProvider>
        </BrowserRouter>
      </Provider>
    </AppContainer>,
    root,
  )
}
render(App)
if (module.hot) {
  module.hot.accept('./views/App', () => {
    const NextApp = require('./views/App').default //eslint-disable-line
    render(NextApp)
  })
}
