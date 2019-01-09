import React from 'react'
import PropTypes from 'prop-types'
import TextField from 'material-ui/TextField'
import { withStyles } from 'material-ui'
import SimpleMDE from 'react-simplemde-editor';
import Conteiner from '../layout/container'
import createStyle from './style'

class createdMessage extends React.Component {
  render() {
    const {
      classes,
    } = this.props
    return (
      <Conteiner>
        <div className={classes.box}>
          <TextField
            id="with-placeholder"
            label="标题"
            placeholder="输入标题"
            className={classes.textField}
            fullWidth
          />
          <SimpleMDE
            id="samplemdeCreateTopic"
            onChange={this.handleContentChange}
            value=""
            options={{
              toolbar: false,
              spellChecker: false,
              placeholder: 'Please Enter Here',
            }}
          />
        </div>
      </Conteiner>
    )
  }
}
createdMessage.propTypes = {
  classes: PropTypes.object.isRequired,
}
export default withStyles(createStyle)(createdMessage)
