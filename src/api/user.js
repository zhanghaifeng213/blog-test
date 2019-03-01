import http from "@/libs/index.js"
export const login = (param) => {
  return http.post('/user/login', param)
}