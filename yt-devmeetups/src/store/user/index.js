/**
 * Created by Жанна on 03.05.2018.
 */
import * as firebase from 'firebase'

export default {
  state: {
    user: null
  },
  mutations: {
    registerUserForMeetup (state, payload) {
      let id = payload.id
      if (state.user.registerMeetups.findIndex(meetupId => meetupId === id) >= 0) {
        return
      }
      state.user.registerMeetups.push(id)
      state.user.fbKeys[id] = payload.fbKey
    },
    unregisterUserFromMeetup (state, payload) {
      let registerMeetups = state.user.registerMeetups
      registerMeetups.splice(registerMeetups.findIndex(meetupId => meetupId === payload), 1)
      Reflect.deleteProperty(state.user.fbKeys, payload)
    },
    setUser (state, payload) {
      state.user = payload
    }
  },
  actions: {
    registerUserForMeetup ({ commit, getters }, payload) {
      commit('setLoading', true)
      let user = getters.user
      firebase.database().ref('/users/' + user.id).child('/registration').push(payload)
        .then(data => {
          commit('setLoading', false)
          commit('registerUserForMeetup', {id: payload, fbKey: data.key})
        })
        .catch(error => {
          console.log(error)
        })
    },
    unregisterUserFromMeetup ({ commit, getters }, payload) {
      commit('setLoading', true)
      let user = getters.user
      if (!user.fbKeys) {
        return
      }
      let fbKey = user.fbKeys[payload]
      firebase.database().ref('/users/' + user.id + '/registration').child(fbKey).remove()
        .then(() => {
          commit('setLoading', false)
          commit('unregisterUserFromMeetup', payload)
        })
        .catch(error => {
          commit('setLoading', false)
          console.log(error)
        })
    },
    signUserUp ({ commit }, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            commit('setLoading', false)
            let newUser = {
              id: user.id,
              registerMeetups: [],
              fbKeys: {}
            }
            commit('setUser', newUser)
          }
        )
        .catch(
          error => {
            commit('setLoading', false)
            commit('setError', error)
            console.log(error)
          }
        )
    },
    signUserIn ({ commit }, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            commit('setLoading', false)
            let newUser = {
              id: user.id,
              registerMeetups: [],
              fbKeys: {}
            }
            commit('setUser', newUser)
          }
        )
        .catch(
          error => {
            commit('setLoading', false)
            commit('setError', error)
            console.log(error)
          }
        )
    },
    autoSignIn ({ commit }, payload) {
      commit('setUser', {id: payload.uid, registerMeetups: [], fbKeys: {}})
    },
    fetchUserData ({ commit, getters }) {
      commit('setLoading', true)
      firebase.database().ref('/users/' + getters.user.id + '/registration').once('value')
        .then(data => {
          let values = data.val()
          let registerMeetups = []
          let fbRefidterKey = {}
          for (let key in values) {
            registerMeetups.push(values[key])
            fbRefidterKey[values[key]] = key
          }
          let updatedUser = {
            id: getters.user.id,
            registerMeetups: registerMeetups,
            fbKeys: fbRefidterKey
          }
          commit('setLoading', false)
          commit('setUser', updatedUser)
        })
        .catch(error => {
          commit('setLoading', false)
          console.log(error)
        })
    },
    logout ({ commit }) {
      firebase.auth().signOut()
      commit('setUser', null)
    }
  },
  getters: {
    user (state) {
      return state.user
    }
  }
}
