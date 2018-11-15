import React from 'react'
import Route from '../config/router'

import AppBar from './layout/app.bar'

export default class App extends React.Component {
  componentDidMount() {
    // 你好
  }

  render() {
    return [
      <AppBar key="Appbar" />,

      <Route key="navbar" />,
    ]
  }
}
