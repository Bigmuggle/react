import {
  observable,
  action,
  // computed,
  // toJS,
  extendObservable,
  computed,
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

  @observable details

  @observable syncing

  constructor({ syncing = false, topics = [], details = [] } = {}) {
    // eslint-disable-next-line no-sequences
    this.syncing = syncing,
    this.topics = topics.map(topic => new Topic(createTopic(topic)))
    this.details = details.map(topic => new Topic(createTopic(topic)))
  }

  addTopic(topic) {
    this.topics.push(new Topic(createTopic(topic)))
  }

  @computed get detailMap() {
    return this.details.reduce((result, detail) => {
      // eslint-disable-next-line no-param-reassign
      result[detail.id] = detail
      return result
    }, {})
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
        reject(err);
        this.syncing = false;
      });
    });
  }

  @action getTopicDetail(id) {
    return new Promise((resolve, reject) => {
      if (this.detailMap[id]) {
        resolve(this.detailMap[id])
      } else {
        get('/topic/'+id, {
          mdrender: false,
        })
          .then((resp) => {
            if (resp.success) {
              const topic = new Topic(createTopic(resp.data))
              this.details.push(topic)
              resolve(topic)
            } else {
              reject()
            }
          }).catch((err) => {
            reject(err)
          })
      }
    })
  }
}
