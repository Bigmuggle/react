import React from 'react'
import axios from 'axios'

class textApi extends React.Component {
  constructor() {
    super()
    this.getLogin = this.getLogin.bind(this)
  }

  componentDidMount() {
    // do something hear
  }

  getTopics() {
    axios.get('/api/topics')
      .then((resp) => {
        console.log(resp)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  getLogin() {
    axios.post('/api/user/login', {
      accessToken: 'b68ffa00-0ba8-4b1c-ade9-c1c2d2e64815',
    })
      .then((resp) => {
        console.log(resp)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  getmarkAll() {
    axios.post('/api/message/mark_all?needAccessToken=true')
      .then((resp) => {
        console.log(resp)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  render() {
    return (
      <div>
        <button onClick={this.getTopics}>topics</button>
        <button onClick={this.getLogin}>login</button>
        <button onClick={this.getmarkAll}>markAll</button>
      </div>
    )
  }
}

export default textApi
