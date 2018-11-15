import React from 'react'
import {
  observer,
  inject,
} from 'mobx-react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import Button from 'material-ui/Button'
import AppState from '../../store/app.state';
import Container from '../layout/container'

@inject('appState') @observer

class TopicList extends React.Component {
  constructor() {
    super()
    this.changeName = this.changeName.bind(this)
    this.componentDidMount = null
  }


  asyncBootstrap() {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.props.appState.count = 4
        resolve(true)
      })
    })
  }

  changeName(event) {
    this.props.appState.changeName(event.target.value)
  }

  render() {
    return (
      <Container>
        <Helmet>
          <title>this is list</title>
          <meta name="description" content="this is description" />
        </Helmet>
        <Button variant="raised" color="primary">hi say</Button>
        <input type="text" onChange={this.changeName} />
        <span>{this.props.appState.msg}</span>
      </Container>
    )
  }
}
TopicList.propTypes = {
  appState: PropTypes.instanceOf(AppState),
}
export default TopicList
