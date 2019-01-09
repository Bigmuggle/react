/* eslint-disable react/no-danger */
import React from 'react'
import PropTypes from 'prop-types'
import {
  inject,
  observer,
} from 'mobx-react'
import Helmet from 'react-helmet'
import Marked from 'marked'
import Simplemde from 'react-simplemde-editor'
import { withStyles } from 'material-ui'
import { CircularProgress } from 'material-ui/Progress'
import Paper from 'material-ui/Paper'
import Button from 'material-ui/Button'
import { Replay } from '@material-ui/icons'
import Container from '../layout/container'
import { topicDetailcontent } from './style'
import Reply from './message'

@inject(stores => ({
  topicStore: stores.topicStore,
  user: stores.appState.user,
})) @observer
class TopicDetail extends React.Component {
  static contextTypes={
    router: PropTypes.object,
  }

  constructor() {
    super()
    this.state = {
      newReply: '',
    }
    this.handleNewReplyChange = this.handleNewReplyChange.bind(this)
    this.doReply = this.doReply.bind(this)
    this.goToLogin = this.goToLogin.bind(this)
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.topicStore.getTopicDetail(id)
  }

  handleNewReplyChange(value) {
    this.setState({
      newReply: value,
    })
  }

  goToLogin() {
    this.context.router.history.push('/user/login')
  }

  doReply() {
    const { id } = this.props.match.params
    const topic = this.props.topicStore.detailMap[id]
    console.log(this.state.newReply)
    topic.doReply(this.state.newReply)
      .then(() => {
        this.setState({
          newReply: '',
        });
      }).catch((err) => {
      console.log(err); //eslint-disable-line
      });
  }

  render() {
    const {
      classes,
      user,
    } = this.props
    const { id } = this.props.match.params

    const topic = this.props.topicStore.detailMap[id]
    if (!topic) {
      return (
        <Container>
          <section>
            <CircularProgress color="secondary" />
          </section>
        </Container>
      );
    }
    return (
      <div>
        <Container>
          <Helmet>
            <title>this is detail</title>
            <meta name="description" content="this is description" />
          </Helmet>
          <header className={classes.header}>
            {topic.title}
          </header>
          <section className={classes.content}>
            <p dangerouslySetInnerHTML={{ __html: Marked(topic.content) }} />
          </section>
        </Container>
        {
          topic.createdReplies && topic.createdReplies.length>0
            ? (
              <Paper elevation={4} className={classes.paper}>
                <header className={classes.answer}>
                  <span>最新回复</span>
                  <span>
                    {topic.createdReplies.length+'条'}
                  </span>
                </header>
                {
                  topic.createdReplies.map(reply => (
                    <Reply
                      key={reply.id}
                      reply={Object.assign({}, reply, {
                        author: {
                          avatar_url: user.info.avatar_url,
                          loginname: user.info.loginname,
                        },
                      })}
                    />
                  ))
                }
              </Paper>

            ):null
        }
        <Paper elevation={4} className={classes.paper}>
          <header className={classes.answer}>
            <span>
              {topic.reply_count}
                回复
            </span>
            <span className={classes.number}>
               最新回复
              {topic.last_reply_at}
            </span>
          </header>
          {
            user.isLogin
              ?(
                <section className={classes.replyEditor}>
                  <Simplemde
                    onChange={this.handleNewReplyChange}
                    value={this.state.newReply}
                    options={
                    {
                      autofocus: 'false',
                      spellChecker: 'false',
                      placeholder: '请输入你的回复',
                    }
                    }

                  />
                  <Button variant="fab" color="secondary" className={classes.replyButton} onClick={this.doReply}>
                    <Replay />
                  </Button>
                </section>
              )
              :null
          }
          {
            !user.isLogin
               && (
               <section className={classes.notLoginButton}>
                 <Button variant="raised" color="secondary" onClick={this.goToLogin}>请登录后再回复</Button>
               </section>
               )
          }
          {
            topic.replies.map(reply => <Reply reply={reply} key={reply.id} />)
          }
        </Paper>

      </div>

    )
  }
}
TopicDetail.wrappedComponent.propTypes = {
  topicStore: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
}
TopicDetail.propTypes = {
  match: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
}
export default withStyles(topicDetailcontent)(TopicDetail)
