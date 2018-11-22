import React from 'react'
import {
  observer,
  inject,
} from 'mobx-react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import Tabs from 'material-ui/Tabs'
import { Tab } from 'material-ui'
// import Button from 'material-ui/Button'
import { CircularProgress } from 'material-ui/Progress';
import List from 'material-ui/List'
import AppState from '../../store/app.state';
import Container from '../layout/container';
import ListItem from './list-item'
import { TopicStore } from '../../store/store';

@inject(stores => ({
  appState: stores.appState,
  topicStore: stores.topicStore,
})) @observer

class TopicList extends React.Component {
  constructor() {
    super()
    this.TabsonChange = this.TabsonChange.bind(this)
    this.ListItemClick = this.ListItemClick.bind(this)
    this.state = {
      tabsIndex: 0,
    }
  }

  componentDidMount() {
    this.props.topicStore.fetchTopic()
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
    alert(1)
  }

  /* eslint-enable */
  render() {
    const {
      topicStore,
    } = this.props
    const syningTopic = topicStore.syncing
    const topicList = topicStore.topics
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
        <List>
          {
          topicList.map(topic => <ListItem onClick={this.ListItemClick} key={topic.id} topic={topic} />)
        }
        </List>
        {
          syningTopic
            ?(
              <div>
                <CircularProgress color="primary" size={60} />
              </div>
            )
            :null
        }
      </Container>
    )
  }
}

TopicList.propTypes = {
  appState: PropTypes.instanceOf(AppState).isRequired,
  topicStore: PropTypes.instanceOf(TopicStore).isRequired,
}
export default TopicList
