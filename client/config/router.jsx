import React from 'react'
import {
  Route,
  Redirect,
} from 'react-router-dom'
import TopicList from '../views/topic-list/index'
import TopicDetail from '../views/topic-detail/index'
import testApi from '../views/test/api.test'

export default () => [
  <Route path="/" render={() => <Redirect to="/list" />} exact key="index" />,
  <Route path="/list" component={TopicList} exact key="list" />,
  <Route path="/detail/:id" component={TopicDetail} exact key="detail" />,
  <Route path="/testapi" component={testApi} exact key="testapi" />,

]
