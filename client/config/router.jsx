import React from 'react'
import {
  Route,
  Redirect,
} from 'react-router-dom'
import TopicList from '../views/topic-list/index'
import TopicDetail from '../views/topic-detail/index'
import testApi from '../views/test/api.test'
import UserLogin from '../views/user/login'
import UserInfo from '../views/user/info'
import TopicCreate from '../views/topic-create/index'

export default () => [
  <Route path="/" render={() => <Redirect to="/list" />} exact key="index" />,
  <Route path="/list" component={TopicList} exact key="list" />,
  <Route path="/create" component={TopicCreate} exact key="create" />,
  <Route path="/detail/:id" component={TopicDetail} exact key="detail" />,
  <Route path="/testapi" component={testApi} exact key="testapi" />,
  <Route path="/user/login" component={UserLogin} exact key="login" />,
  <Route path="/user/info" component={UserInfo} exact key="info" />,
]
