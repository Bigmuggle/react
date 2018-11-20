import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
// import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import { ListItemAvatar } from 'material-ui';


const styles = {
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: '#555',
  },
};
const primary = ({ topic }) => (
  <div>
    <span>{topic.tab}</span>
    <span>{topic.title}</span>
  </div>
)

const Seconday = ({ topic }) => (
  <div>
    <span>{topic.username}</span>
    <span>
      <span>{topic.reply_count}</span>
      <span>/</span>
      <span>{topic.cisit_count}</span>
    </span>
  </div>
)

const TopicListItem= ({ onClick, topic }) => (
  <ListItem button onClick={onClick}>
    <ListItemAvatar>
      <Avatar src={topic.image} />
    </ListItemAvatar>
    <ListItemText
      primary={<primary topic={topic} />}
      seconday={<Seconday topic={topic} />}
    />
  </ListItem>
)


primary.propTypes = {
  topic: PropTypes.object.isRequired,
};

Seconday.propTypes = {
  topic: PropTypes.object.isRequired,
};
TopicListItem.propTypes = {
  onClick: PropTypes.object.isRequired,
  topic: PropTypes.object.isRequired,
};
export default withStyles(styles)(TopicListItem)
