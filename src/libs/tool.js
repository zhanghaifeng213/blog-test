import Cookies from "js-cookie";
export const clearLoginInfo = () => {
  Cookies.remove("username")
}
export const hasLogin = () => {
  if (Cookies.get("username")) {
    return true
  } else {
    return false
  }
}

export const changeImg = (url) => {
  return process.env.ROOT + url;
}