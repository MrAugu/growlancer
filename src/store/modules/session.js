import axios from "axios"
import { apiBase } from "../../../conf.json";

const state = {
  token: "",
  username: "",
  discriminator: "",
  id: "",
  growid: "",
  loggedIn: false
};

const getters = {
  allGuilds: () => state.guilds,
  token: () => state.token,
  username: () => state.username,
  id: () => state.id,
  growid: () => state.growid,
  authenticated: () => state.loggedIn
};

const actions = {
  async setToken ({ commit }, token) {
    commit("setToken", token);
  },
  async fetchUserData ({ commit }) {
    axios.get(`${apiBase}/v1/fetch/${state.id}`).then(response => {
      commit("setFreshFetchedData", response);
    }).catch(e => console.error(e));
  },
  projectUserData({ commit }, data) {
    commit("setFetchedData", data);
  }
};

const mutations = {
  setToken: (state, token) => (state.accessToken = token),
  setFetchedData: (state, data) => {
    state.discriminator = data.discriminator;
    state.username = data.username;
    state.id = data.id;
    state.growid = data.growid;
    state.loggedIn = true;
  },
  setFreshFetchedData: (state, data) => {
    data = data.data;
    state.username = data.username;
    state.id = data.id;
    state.growid = data.growid;
    state.loggedIn = true;
    if (localStorage.getItem("session-data")) localStorage.removeItem("session-data");
    if (localStorage.getItem("expires-in")) localStorage.removeItem("expires-in");

    localStorage.setItem("session-data", JSON.stringify(data));
    localStorage.setItem("expires-in", (Date.now() + 1000 * 60 * 60 * 72));
  }
};

export default {
  state,
  getters,
  actions,
  mutations
}