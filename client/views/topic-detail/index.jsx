/* eslint-disable react/no-danger */
import React from 'react'
import PropTypes from 'prop-types'
import {
  inject,
  observer,
} from 'mobx-react'
import Helmet from 'react-helmet'
import Marked from 'marked'
import { withStyles } from 'material-ui'
import { CircularProgress } from 'material-ui/Progress'
import Paper from 'material-ui/Paper'
import Container from '../layout/container'
import { TopicStore } from '../../store/store';
import { topicDetailcontent } from './style'
import Reply from './message'

@inject(stores => ({
  topicStore: stores.topicStore,
})) @observer
class TopicDetail extends React.Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.topicStore.getTopicDetail(id)
  }

  render() {
    const {
      classes,
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
          {/* <Reply /> */}
          {

            topic.replies.map(reply => <Reply reply={reply} key={reply.id} />)
          }
        </Paper>

      </div>

    )
  }
}
TopicDetail.wrappedComponent.propTypes = {
  topicStore: PropTypes.instanceOf(TopicStore),

}
TopicDetail.propTypes = {
  match: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
}
export default withStyles(topicDetailcontent)(TopicDetail)
