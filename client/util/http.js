/* eslint-disable prefer-destructuring */
import axios from 'axios'

const baseUrl = process.env.API_BASE || ''
const parseUrl = (url, params) => {
  const str = Object.keys(params).reduce((result, key) => {
    // eslint-disable-next-line no-param-reassign
    result +=`${key}=${params[key]}&`
    return result
  }, '')
  return `${baseUrl}/api/${url}?${str.substr(0, str.length-1)}`
}

export const get = (url, params) => new Promise((resolve, reject) => {
  axios.get(parseUrl(url, params))
    .then((resp) => {
      // eslint-disable-next-line prefer-destructuring
      const data = resp.data
      if (data && data.success ===true) {
        resolve(data)
      } else {
        reject(data)
      }
    }).catch(reject)
})
export const post = (url, params, data) => new Promise((resolve, reject) => {
  axios.post(baseUrl(url, params), data)
    .then((resp) => {
      // eslint-disable-next-line prefer-destructuring
      // eslint-disable-next-line no-shadow
      const data = resp.data
      if (data && data.success ===true) {
        resolve(data)
      } else {
        reject(data)
      }
    }).catch(reject)
})
