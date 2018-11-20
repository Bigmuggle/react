import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
// import List from '@material-ui/core/List';
import { ListItem, ListItemText } from 'material-ui';
// import ListItemText from '@material-ui/core/ListItemText';
import Avatar from 'material-ui/Avatar';
import ListItemAvatar from 'material-ui/List/ListItemAvatar';

import { topicPrimaryStyle, topicSecondartStyles } from './styles'

const styles = {
  root: {
    display: 'flex',
  },
}
const Primary = ({ classes, topic }) => (
  <div className={classes.root}>
    <span className={classes.tab}>{topic.tab}</span>
    <span className={classes.title}>{topic.title}</span>
  </div>
)

const Seconday = ({ classes, topic }) => (
  <div className={classes.root}>
    <span className={classes.username}>{topic.username}</span>
    <span>
      <span className={classes.reply_count} title="回复数">{topic.reply_count}</span>
      <span>/</span>
      <span className={classes.count} title="浏览数">{topic.cisit_count}</span>
    </span>
    <span className={classes.creat_at} title="创建时间">
         创建时间：
      {topic.creat_at}
    </span>
  </div>
)
const StyledPrimary = withStyles(topicPrimaryStyle)(Primary)
const StyledSeconday = withStyles(topicSecondartStyles)(Seconday)
function TopicListItem({ onClick, topic }) {
  return (
    <ListItem button onClick={onClick}>
      <ListItemAvatar>
        <Avatar src={topic.image} />
      </ListItemAvatar>
      <ListItemText>
        <StyledPrimary topic={topic} />
        <StyledSeconday topic={topic} />
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
  onClick: PropTypes.object.isRequired,
  topic: PropTypes.object.isRequired,
};
export default withStyles(styles)(TopicListItem)
