import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    aqiData: [],
    chosenAqi: [],
    favouriteAqi: [],
    counter: 0
  },
  mutations: {
    getAqiData (state, payload) {
      state.aqiData = payload
      state.aqiData.forEach(element => {
        Vue.set(element, 'isFavourite', false)
      })
    },
    getChosenAqi (state, payload) {
      if (payload.site) {
        state.chosenAqi = state.aqiData.filter(element => {
          return element.County === payload.county && element.SiteName === payload.site
        })
      } else {
        state.chosenAqi = state.aqiData.filter(element => {
          return element.County === payload.county
        })
      }
    },
    getFavouriteAqi (state, payload) {
      if (state.favouriteAqi.includes(payload)) {
        state.favouriteAqi = state.favouriteAqi.filter(element => {
          return element.SiteName !== payload.SiteName
        })
      } else {
        state.favouriteAqi.push(payload)
        let tempAqi = state.aqiData.find(element => element.SiteName === payload.SiteName)
        tempAqi.favouriteIndex = state.counter++
      }
    }
  },
  actions: {
    loadAqiData (context) {
      const apiUrl = `${process.env.VUE_APP_APIPATH}`
      axios.get(apiUrl).then(response => {
        context.commit('getAqiData', response.data)
      })
    }
  }
})
