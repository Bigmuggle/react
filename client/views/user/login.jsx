/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
// import { Redirect } from 'react-router-dom';


// import TextField from 'material-ui/TextField';
// import Button from 'material-ui/Button';
// import UserWrapper from './user';
import loginStyles from './styles/login-style';


class UserLogin extends React.Component {
  constructor() {
    super();
  }

  render() {
    const { classes } = this.props;

    return (

      <div className={classes.box}>

            Login
      </div>

    );
  }
}
UserLogin.propTypes = {
  classes: PropTypes.object.isRequired,
  // location: PropTypes.object.isRequired,
};
// UserLogin.wrappedComponent.propTypes = {
//   appState: PropTypes.object.isRequired,
//   user: PropTypes.object.isRequired,
// };

export default withStyles(loginStyles)(UserLogin);
