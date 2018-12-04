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
import Container from '../layout/container'
import { TopicStore } from '../../store/store';
import { topicDetailcontent } from './style'

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
    console.log(topic)
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
