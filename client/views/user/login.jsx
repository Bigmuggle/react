import React from 'react'
import PropTypes from 'prop-types'
import {
  observer,
  inject,
} from 'mobx-react'

import { withStyles } from 'material-ui'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
import loginStyles from './styles/login-style'
import UserWrapper from './user';

@inject(stores => ({
  appState: stores.appState,
  user: stores.appState.user,
})) @observer
class FormLogin extends React.Component {
  static contextTypes = {
    router: PropTypes.object,
  }

  constructor() {
    super()
    this.state={
      helperText: '',
      accessToken: '',
    }
    this.loginInput = this.loginInput.bind(this)
    this.loginBtn = this.loginBtn.bind(this)
  }

  componentDidMount() {

  }

  loginInput(event) {
    this.setState({
      accessToken: event.target.value.trim(),
    })
  }

  loginBtn() {
    if (!this.state.accessToken) {
      this.setState({
        helperText: '必须填写',
      })
    }
    this.setState({
      helperText: '',
    })

    return this.props.appState.login(this.state.accessToken)
      .then(() => {
        console.log(1)
        this.context.router.history.replace('/user/info')
      }).catch((err) => {
        console.log(err)
      })
  }

  render() {
    const {
      classes,
    } = this.props
    return (
      <UserWrapper>
        <Paper className={classes.box}>
          <div className={classes.root}>
            <TextField
              id="password-input"
              label="密匙"
              className={classes.textField}
              type="password"
              value={this.state.accessToken}
              helperText={this.state.helperText}
              onChange={this.loginInput}
              autoComplete="current-password"
              margin="normal"
            />
            <Button variant="raised" color="primary" className={classes.button} onClick={this.loginBtn}>
              登录
            </Button>
          </div>
        </Paper>
      </UserWrapper>

    )
  }
}
FormLogin.propTypes = {
  classes: PropTypes.object.isRequired,
}
FormLogin.wrappedComponent.propTypes = {
  appState: PropTypes.object.isRequired,
  // user: PropTypes.object.isRequired,
}
export default withStyles(loginStyles)(FormLogin)
