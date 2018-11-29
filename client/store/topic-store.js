import {
  observable,
  action,
  // computed,
  // toJS,
  extendObservable,
} from 'mobx'
import { get } from '../util/http'
import topicSharme from '../util/variable-define'

const createTopic = topic => Object.assign({}, topicSharme, topic)

class Topic {
  constructor(data) {
    extendObservable(this, data)
  }

  @observable syncing = false
}

export default class TopicStore {
  @observable topics

  @observable syncing

  constructor({ syncing, topics } = { syncing: false, topics: [] }) {
    // eslint-disable-next-line no-sequences
    this.syncing = syncing,
    this.topics = topics.map(topic => new Topic(createTopic(topic)))
  }

  addTopic(topic) {
    this.topics.push(new Topic(createTopic(topic)))
  }

  @action fetchTopic(tab) {
    return new Promise((resolve, reject) => {
      this.syncing = true
      get('/topics', {
        mdrender: false,
        tab,
      }).then((resp) => {
        if (resp.success) {
          this.topics = resp.data.map(topic => new Topic(createTopic(topic)));
          resolve();
        } else {
          reject();
        }
        this.syncing = false;
      }).catch((err) => {
        console.log(err);//eslint-disable-line
        reject(err);
        this.syncing = false;
      });
    });
  }
}
