/* eslint-disable react/no-danger */
import React from 'react'
import PropTypes from 'prop-types'
import Marked from 'marked'
import dateFormat from 'dateformat';
import Avatar from 'material-ui/Avatar'
import { withStyles } from 'material-ui'
import { ReplyStyle } from './style'

function Reply({ reply, classes }) {
  return (
    <div className={classes.root}>
      <div className={classes.left}>
        <Avatar src={reply.author.avatar_url} />
      </div>
      <div className={classes.right}>
        <div className={classes.username}>
          <span>
            <span>{`${reply.author.loginname} ${dateFormat(reply.create_at, 'yy-mm-dd')}`}</span>
          </span>
        </div>
        <div>
          <p dangerouslySetInnerHTML={{ __html: Marked(reply.content) }} />
        </div>
      </div>
    </div>
  )
}
Reply.propTypes = {
  reply: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
}

export default withStyles(ReplyStyle)(Reply)
