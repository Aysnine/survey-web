import Vue from 'vue'
import Vuex from 'vuex'
import { fetchSurveyList, createSurvey, updateSurveyEnable } from '@/api/survey'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    survey: []
  },
  mutations: {
    SET_SURVEY_LIST(state, v) {
      state.survey = v
    }
  },
  actions: {
    async fetch({ dispatch }) {
      try {
        await dispatch('fetchSurveyList')
      } catch (error) {
        throw error
      }
    },
    async fetchSurveyList({ commit }) {
      try {
        let rst = await fetchSurveyList()
        commit('SET_SURVEY_LIST', rst.data)
        return rst
      } catch (error) {
        throw error
      }
    },
    async createSurvey({ dispatch }, form) {
      try {
        let rst = await createSurvey(form)
        dispatch('fetch')
        return rst
      } catch (error) {
        throw error
      }
    },
    async updateSurveyEnable(_, form) {
      try {
        let rst = await updateSurveyEnable(form)
        return rst
      } catch (error) {
        throw error
      }
    }
  }
})
