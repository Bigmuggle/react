import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import cx from 'classnames';
import { ListItem, ListItemText } from 'material-ui';
// import ListItemText from '@material-ui/core/ListItemText';
import Avatar from 'material-ui/Avatar';
import ListItemAvatar from 'material-ui/List/ListItemAvatar';

import { topicPrimaryStyle, topicSecondartStyles } from './styles'
import { tabs } from '../../util/variable-define'

const styles = {
  root: {
    display: 'flex',
  },
}
const Primary = ({ classes, topic }) => {
  const classNames = cx({
    [classes.tab]: true,
    [classes.top]: topic.top,
  })
  return (
    <span className={classes.root}>
      <span className={classNames}>{topic.top ? '置顶' : tabs[topic.tab]}</span>
      <span className={classes.title}>{topic.title}</span>
    </span>
  )
}

const Seconday = ({ classes, topic }) => (
  <span className={classes.root}>
    <span className={classes.username}>{topic.author.loginname}</span>
    <span>
      <span className={classes.reply_count} title="回复数">{topic.reply_count}</span>
      <span>/</span>
      <span className={classes.count} title="浏览数">{topic.visit_count}</span>
    </span>
    <span className={classes.creat_at} title="创建时间">
         创建时间：
      {topic.create_at}
    </span>
  </span>
)
const StyledPrimary = withStyles(topicPrimaryStyle)(Primary)
const StyledSeconday = withStyles(topicSecondartStyles)(Seconday)
function TopicListItem({ onClick, topic }) {
  return (
    <ListItem button onClick={onClick}>
      <ListItemAvatar>
        <Avatar src={topic.author.avatar_url} />
      </ListItemAvatar>
      <ListItemText>
        <div>
          <StyledPrimary topic={topic} />
          <StyledSeconday topic={topic} />
        </div>
      </ListItemText>
    </ListItem>
  )
}


Primary.propTypes = {
  classes: PropTypes.object.isRequired,
  topic: PropTypes.object.isRequired,
};

Seconday.propTypes = {
  classes: PropTypes.object.isRequired,
  topic: PropTypes.object.isRequired,
};
TopicListItem.propTypes = {
  onClick: PropTypes.object,
  topic: PropTypes.object.isRequired,
};
export default withStyles(styles)(TopicListItem)
