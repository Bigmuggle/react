import React from 'react'
import PropTypes from 'prop-types'
import { CircularProgress } from 'material-ui/Progress'
import {
  observer,
  inject,
} from 'mobx-react'
import { withStyles } from 'material-ui'
import Grid from 'material-ui/Grid'
import Paper from 'material-ui/Paper'
import
List,
{
  ListItem,
  ListItemText,
} from 'material-ui/List'
import Typography from 'material-ui/Typography'
import Avatar from 'material-ui/Avatar'
import UserWrapper from './user'
import infoStyle from './styles/info-style'

const ListItems = ({ topic, onClick }) => (
  <div>
    <List component="nav">
      <ListItem button onClick={onClick}>
        <Avatar src={topic.author.avatar_url} />
        <ListItemText primary={topic.title} secondary={topic.last_reply_at} />
      </ListItem>

    </List>
  </div>
)
@inject(stores => ({
  user: stores.appState.user,
  appState: stores.appState,
})) @observer
class LoginInfo extends React.Component {
  static contextTypes = {
    router: PropTypes.object,
  }

  constructor() {
    super()
  }

  componentWillMount() {
    console.log(this.context.router.history.action)
    if (!this.props.user.isLogin) {
      this.context.router.history.replace('/user/login')
    } else {
      this.props.appState.getUserDetail()
      this.props.appState.getUserCollect()
    }
  }

  goToTopic(id) {
    this.context.router.history.push('/detail/'+id)
  }

  render() {
    const {
      classes,
    } = this.props
    const topics = this.props.appState.user.detail.recentTopics
    const replies = this.props.appState.user.detail.recentReplies
    const list = this.props.appState.user.collections.List
    return (
      <UserWrapper className={classes.Paper}>
        <Grid container spacing={16} align="stretch">
          <Grid xs={12} md={4} item>
            <Paper elevation={2} className={classes.paper}>
              <Typography variant="title" gutterBottom className={classes.prgrstyle}>
                <span>最近发布的话题</span>
              </Typography>
              {
                this.props.user.detail.syncing
                  ?(
                    <List>

                      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                        <CircularProgress />
                      </div>

                    </List>
                  )
                  :(
                    <div>
                      {
                        topics.length > 0
                          ?replies.map(topic => (
                            <ListItems
                              topic={topics}
                              key={topic.id}
                              onClick={() => { this.goToTopic(topic.id) }}
                            />
                          ))
                          : (
                            <Typography align="center">
                                                最近没有话题
                            </Typography>
                          )
                      }
                    </div>
                  )
              }
            </Paper>
          </Grid>
          <Grid xs={12} md={4} item>
            <Paper elevation={2} className={classes.paper}>
              <Typography variant="title" gutterBottom className={classes.prgrstyle}>
                <span>新的回复</span>
              </Typography>
              {
                this.props.user.detail.syncing
                  ?(
                    <List>

                      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                        <CircularProgress />
                      </div>

                    </List>
                  )
                  :(
                    <div>
                      {
                        replies.length > 0
                          ? replies.map(topic => (
                            <ListItems
                              topic={topic}
                              key={topic.id}
                              onClick={() => { this.goToTopic(topic.id) }}
                            />
                          ))
                          : (
                            <Typography align="center">
                            最近没有回复
                            </Typography>
                          )
                      }

                    </div>
                  )
              }
            </Paper>
          </Grid>
          <Grid xs={12} md={4} item>
            <Paper elevation={2} className={classes.paper}>
              <Typography variant="title" gutterBottom className={classes.prgrstyle}>
                <span>收藏的话题</span>
              </Typography>
              {
                this.props.user.detail.syncing
                  ?(
                    <List>
                      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                        <CircularProgress />
                      </div>
                    </List>
                  )
                  :(
                    <div>
                      {
                        list.length > 0
                          ? replies.map(topic => (
                            <ListItems
                              topic={topic}
                              key={topic.id}
                              onClick={() => { this.goToTopic(topic.id) }}
                            />
                          ))
                          : (
                            <Typography align="center">
                            你还没有收藏呢
                            </Typography>
                          )
                      }

                    </div>
                  )
              }
            </Paper>
          </Grid>
        </Grid>
      </UserWrapper>
    )
  }
}
LoginInfo.propTypes = {
  classes: PropTypes.object.isRequired,

}
LoginInfo.wrappedComponent.propTypes = {
  appState: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
}
ListItems.propTypes = {
  onClick: PropTypes.object,
  topic: PropTypes.object.isRequired,
};
export default withStyles(infoStyle)(LoginInfo)
