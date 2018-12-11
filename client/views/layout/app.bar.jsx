import React from 'react'
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import {
  inject,
  observer,
} from 'mobx-react'

import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import HomeIcon from 'material-ui-icons/Home'

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
}
@inject(stores => ({
  appState: stores.appState,
  user: stores.appState.user,
})) @observer
/* eslint-disable */
class MenuAppBar extends React.Component {
  static contextTypes = {
    router:PropTypes.object
  }
  constructor() {
    super()
    this.onHomeButtonClick = this.onHomeButtonClick.bind(this)
    this.createButtonClick = this.createButtonClick.bind(this)
    this.loginButtonClick = this.loginButtonClick.bind(this)
  }

  onHomeButtonClick() {
    this.context.router.history.replace('/list')
  }

  createButtonClick() {

  }

  loginButtonClick() {
    if(!this.props.user.isLogin){
      this.context.router.history.replace('/user/login')
    }
  }

  render(_props) {
    const {
      classes ,
      user,
    } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="fixed">
          <Toolbar>
            <IconButton color="secondary" onClick={this.onHomeButtonClick}>
              <HomeIcon />
            </IconButton>
            <Typography className={classes.flex} variant="title">
              cnode
            </Typography>
            <Button color="default" variant='raised'  onClick={this.createButtonClick}>
              新建话题
            </Button>
            <Button color="secondary"  onClick={this.loginButtonClick}>
              {
                user.isLogin? user.info.loginname: '登录'
              }
            </Button>
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}
/* eslint-enable */
MenuAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};
export default withStyles(styles)(MenuAppBar);
