import React from 'react'
import {
  observer,
  inject,
} from 'mobx-react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import Tabs from '@material-ui/core/Tabs'
import { Tab } from '@material-ui/core'
// import Button from 'material-ui/Button'
import AppState from '../../store/app.state';
import Container from '../layout/container';
// import ListItem from './list-item'

@inject('appState') @observer

class TopicList extends React.Component {
  constructor() {
    super()
    this.TabsonChange = this.TabsonChange.bind(this)
    this.ListItemClick = this.ListItemClick.bind(this)
    this.state = {
      tabsIndex: 0,
    }
  }


  asyncBootstrap() {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.props.appState.count = 4
        resolve(true)
      })
    })
  }

  TabsonChange(e, index) {
    this.setState({
      tabsIndex: index,
    })
  }
/*eslint-disable*/
  ListItemClick() {
ALERT
  }

  /* eslint-enable */
  render() {
    // const topic={

    // }
    return (
      <Container>
        <Helmet>
          <title>this is list</title>
          <meta name="description" content="this is description" />
        </Helmet>
        <Tabs value={this.state.tabsIndex} onChange={this.TabsonChange}>
          <Tab label="全部" />
          <Tab label="精华" />
          <Tab label="分享" />
          <Tab label="问答" />
          <Tab label="招聘" />
          <Tab label="测试" />
        </Tabs>
        {/* <ListItem onClick={this.ListItemClick} topic={topic} /> */}
      </Container>
    )
  }
}
TopicList.propTypes = {
  appState: PropTypes.instanceOf(AppState),
}
export default TopicList
