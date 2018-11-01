import React from 'react'
import ReactDom from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { AppContainer } from 'react-hot-loader' //eslint-disable-line
import { Provider } from 'mobx-react'
import appState from './store/app.state'
import App from './views/App'


const root = document.getElementById('root')
const render = (Component) => {
  const readerMethod = module.hot ? ReactDom.render : ReactDom.hydrate
  readerMethod(
    <AppContainer>
      <Provider appState={appState}>
        <BrowserRouter>
          <Component />
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
