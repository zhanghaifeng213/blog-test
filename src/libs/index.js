import axios from "axios"

const root = process.env.ROOT

const http = axios.create({
  timeout: 1000 * 30,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json; charset=utf-8'
  },
  // 'Content-Type': 'application/json; charset=utf-8'
})

http.adornUrl = actionName => {
  return (
    (process.env.NODE_ENV == 'development' ? '/proxyApi/' : root) + actionName
  )
}

export default http