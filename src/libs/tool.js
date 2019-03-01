import Cookies from "js-cookie";
export const clearLoginInfo = () => {
  Cookies.remove("username")
}