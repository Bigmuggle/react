import React from 'react';
import PropTypes from 'prop-types';
import {
  observer,
  inject,
} from 'mobx-react'
import { withStyles } from 'material-ui/styles';
import Avatar from 'material-ui/Avatar'
import PermIdentity from 'material-ui-icons/PermIdentity'
import Container from '../layout/container'
// import { Redirect } from 'react-router-dom';


// import TextField from 'material-ui/TextField';
// import Button from 'material-ui/Button';

import userStyles from './styles/user-style';

@inject(stores => ({
  user: stores.appState.user,
})) @observer
class UserLogin extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {

  }

  render() {
    const {
      classes,
      user,
    } = this.props;
    // const avaterUrl = ''
    return (
      <Container elevation={4} className={classes.root}>
        <div className={classes.box}>
          {
              user.isLogin? (
                <Avatar className={classes.avatar} src={user.avatar_url} />
              )
                : (
                  <Avatar className={classes.avatar}>
                    <PermIdentity style={{ fontSize: 110 }} />
                  </Avatar>
                )
            }

        </div>
        {this.props.children}
      </Container>
    );
  }
}
UserLogin.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.element.isRequired,
  // location: PropTypes.object.isRequired,
};
UserLogin.wrappedComponent.propTypes = {
  user: PropTypes.object.isRequired,
};

export default withStyles(userStyles)(UserLogin);
