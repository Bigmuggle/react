import React from 'react'
import ReactDom from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { AppContainer } from 'react-hot-loader' //eslint-disable-line
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles'
import { lightBlue, pink } from 'material-ui/colors'
import { Provider } from 'mobx-react'
import AppState from './store/app.state'
import App from './views/App'

const theme = createMuiTheme({
  palette: {
    primary: pink,
    secondary: lightBlue,
    type: 'light',
  },
});

const initialState = window.__INITIAL__STATE__ || {} // eslint-disable-line
const createApp = (TheApp) => {
  class Main extends React.Component {
    // Remove the server-side injected CSS.
    componentDidMount() {
      const jssStyles = document.getElementById('jss-server-side');
      if (jssStyles && jssStyles.parentNode) {
        jssStyles.parentNode.removeChild(jssStyles);
      }
    }

    render() {
      return <TheApp />
    }
  }
  return Main
}
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
render(createApp(App))
if (module.hot) {
  module.hot.accept('./views/App', () => {
    const NextApp = require('./views/App').default //eslint-disable-line
    render(createApp(NextApp))
  })
}
