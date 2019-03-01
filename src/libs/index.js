import axios from "axios"

const baseURL = process.env.NODE_ENV == "development" ? '/proxyApi/' : "process.env.ROOT"

export default {
  //get请求
  get(url, param) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'get',
        url: baseURL + url,
        params: param,
      }).then(res => {
        resolve(res)
      })
    })
  },
  //post请求
  post(url, param) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url: baseURL + url,
        data: param,
      }).then(res => {
        resolve(res)
      })
    })
  }
}