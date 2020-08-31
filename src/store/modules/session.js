import axios from "axios"
import { apiBase } from "../../../conf.json";

const state = {
  accessToken: "",
  guilds: [],
  priviledgedGuilds: [],
  username: "",
  discriminator: "",
  id: "",
  loggedIn: false
};

const getters = {
  allGuilds: () => state.guilds,
  allPriviledgedGuilds: () => state.priviledgedGuilds,
  token: () => state.accessToken,
  username: () => state.username,
  discriminator: () => state.discriminator,
  id: () => state.id,
  authenticated: () => state.loggedIn
};

const actions = {
  async setToken ({ commit }, token) {
    commit("setToken", token);
  },
  async fetchUserData ({ commit }) {
    axios.get(`${apiBase}/v1/fetch/${state.accessToken}`).then(response => {
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
    state.guilds = data.guilds;
    state.priviledgedGuilds = data.priviledgedGuilds;
    state.loggedIn = true;
  },
  setFreshFetchedData: (state, data) => {
    data = data.data;
    state.discriminator = data.discriminator;
    state.username = data.username;
    state.id = data.id;
    state.guilds = data.guilds;
    state.priviledgedGuilds = data.priviledgedGuilds;
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