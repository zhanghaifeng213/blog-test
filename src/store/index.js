import Vue from 'vue'
import Vuex from 'vuex'
import Cookies from "js-cookie";
import { clearLoginInfo, hasLogin } from "@/libs/tool.js"
import { info } from '../api/user';
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    username: Cookies.get("username"),
    hasLogin: false,
    avatar: "",
    role: ''
  },
  mutations: {
    setUsername(state, val) {
      Cookies.set("username", val);
      state.username = val
    },
    setLogin(state, val) {
      state.hasLogin = val
    },
    setLogout(state) {
      clearLoginInfo()
      state.hasLogin = false
      state.username = ''
    },
    setAvatar(state, val) {
      state.avatar = val
    },
    setRole(state, val) {
      state.role = val
    }
  },
  actions: {
    handleInfo({ commit }) {
      info().then(res => {
        if (res.data.data) {
          commit('setAvatar', res.data.data.avatar)
          commit('setRole', res.data.data.role)
          commit('setLogin', true)
        }
      })
    }
  }

})

export default store