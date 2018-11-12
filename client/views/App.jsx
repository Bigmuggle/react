import React from 'react'
import { Link } from 'react-router-dom'
import Route from '../config/router'


export default class App extends React.Component {
  constructor() {
    super()
    this.componentWillReceiveProps = null;
    this.componentWillMount = null
  }

  componentDidMount() {
    // 你好
  }

  render() {
    return [
      <div key="banner">
        <Link to="/">首页1</Link>
        <br />
        <Link to="/detail">详情页2</Link>
      </div>,
      <Route key="navbar" />,
    ]
  }
}
