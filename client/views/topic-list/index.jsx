import React from 'react'
import {
  observer,
  inject,
} from 'mobx-react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import Tabs, { Tab } from 'material-ui/Tabs'
import queryString from 'query-string'
// import Button from 'material-ui/Button'
import { CircularProgress } from 'material-ui';

import List from 'material-ui/List'
import Container from '../layout/container';
import ListItem from './list-item'
// import { TopicStore, AppState } from '../../store/store';
import { tabs } from '../../util/variable-define'

@inject(stores => ({
  appState: stores.appState,
  topicStore: stores.topicStore,
})) @observer

export default class TopicList extends React.Component {
  static contextTypes = {
    router: PropTypes.object,
  }


  constructor() {
    super()
    this.TabsonChange = this.TabsonChange.bind(this)
    this.ListItemClick = this.ListItemClick.bind(this)
  }

  componentDidMount() {
    const tab = this.getTab()
    this.props.topicStore.fetchTopic(tab)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.search !== this.props.location.search) {
      // eslint-disable-next-line no-alert
      this.props.topicStore.fetchTopic(this.getTab(nextProps.location.search))
    }
  }

  getTab(search) {
    // eslint-disable-next-line no-param-reassign
    search = search || this.props.location.search;
    const query = queryString.parse(search)
    return query.tab || 'all'
  }

  asyncBootstrap() {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.props.appState.count = 4
        resolve(true)
      })
    })
  }

  TabsonChange(e, value) {
    this.context.router.history.push({
      pathname: '/list',
      search: '?tab='+value,
    })
  }

  ListItemClick(topic) {
    this.context.router.history.push('/detail/'+topic.id)
  }

  render() {
    const {
      topicStore,
    } = this.props
    const syningTopic = topicStore.syncing
    // eslint-disable-next-line no-alert
    const topicList = topicStore.topics
    const tab = this.getTab()
    return (
      <Container>
        <Helmet>
          <title>this is list</title>
          <meta name="description" content="this is description" />
        </Helmet>
        <Tabs value={tab} onChange={this.TabsonChange}>
          {
          Object.keys(tabs).map(t => <Tab value={t} key={tabs[t]} label={tabs[t]} />)
          }
        </Tabs>

        <List>
          {
             topicList.map(topic => <ListItem onClick={() => { this.ListItemClick(topic) }} key={topic.id} topic={topic} />)
          }
        </List>
        {
          syningTopic ? (
            <div style={{ display: 'flex', justifyContent: 'space-around', padding: '40px 0' }}>
              <CircularProgress color="secondary" size={100} />
            </div>
          ) : null
         }
      </Container>
    )
  }
}

TopicList.wrappedComponent.propTypes = {
  appState: PropTypes.object.isRequired,
  topicStore: PropTypes.object.isRequired,
};
TopicList.propTypes = {
  location: PropTypes.object.isRequired,
};
