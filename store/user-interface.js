import { SET } from '@/shared/mutations.js'

export const state = () => ({
  pageTitle: 'header title',
  ouc: {}
})

export const actions = {
  setOUC ({ commit }, payload) {
    commit('SET', { key: 'ouc', data: payload })
  }
}

export const mutations = {
  SET
}
