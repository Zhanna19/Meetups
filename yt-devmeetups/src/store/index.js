/**
 * Created by Жанна on 03.05.2018.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    loadedMeetups: [
      {
        imageUrl: 'https://lonelyplanetimages.imgix.net/mastheads/GettyImages-538096543_medium.jpg?sharp=10&vib=20&w=1200',
        id: 'asdsdsd1',
        title: 'Meetup in New York',
        date: new Date(),
        location: 'New York',
        description: 'New York New York'
      },
      {
        imageUrl: 'https://lonelyplanetimages.imgix.net/mastheads/GettyImages-500759045_super.jpg?sharp=10&vib=20&w=1200',
        id: 'asdsdsd2',
        title: 'Paris',
        date: new Date(),
        location: 'Paris',
        description: 'It\'s Paris!'
      }
    ],
    user: null,
    loading: false,
    error: null
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
    setLoadedMeetups (state, payload) {
      state.loadedMeetups = payload
    },
    createMeetup (state, payload) {
      state.loadedMeetups.push(payload)
    },
    updateMeetup (state, payload) {
      let meetup = state.loadedMeetups.find(meetup => {
        return meetup.id === payload.id
      })
      if (payload.title) {
        meetup.title = payload.title
      }
      if (payload.description) {
        meetup.description = payload.description
      }
      if (payload.date) {
        meetup.date = payload.date
      }
    },
    setUser (state, payload) {
      state.user = payload
    },
    setLoading (state, payload) {
      state.loading = payload
    },
    setError (state, payload) {
      state.error = payload
    },
    clearError (state) {
      state.error = null
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
    loadMeetups ({ commit }) {
      commit('setLoading', true)
      firebase.database().ref('meetups').once('value')
        .then(data => {
          let meetups = []
          let obj = data.val()
          for (let key in obj) {
            meetups.push({
              id: key,
              title: obj[key].title,
              description: obj[key].description,
              imageUrl: obj[key].imageUrl,
              date: obj[key].date,
              location: obj[key].location,
              creatorId: obj[key].creatorId
            })
          }
          commit('setLoadedMeetups', meetups)
          commit('setLoading', false)
        })
        .catch(error => {
          commit('setLoading', false)
          console.log(error)
        })
    },
    createMeetup ({ commit }, payload) {
      const meetup = {
        title: payload.title,
        location: payload.location,
        description: payload.description,
        date: payload.date.toISOString(),
        creatorId: this.getters.user.id
      }
      let imageUrl
      let key
      firebase.database().ref('meetups').push(meetup)
        .then((data) => {
          key = data.key
          return key
        })
        .then(key => {
          let filename = payload.image.name
          let ext = filename.slice(filename.lastIndexOf('.'))
          return firebase.storage().ref('meetups/' + key + ext).put(payload.image)
        })
        .then(fileData => {
          let storageRef = firebase.storage().ref('meetups').child(fileData.metadata.name)
          storageRef.getDownloadURL()
            .then((url) => {
              imageUrl = url
              return firebase.database().ref('meetups').child(key).update({imageUrl: imageUrl})
            })
            .then(() => {
              commit('createMeetup', {...meetup, imageUrl: imageUrl, id: key})
            })
            .catch(error => {
              console.log(error)
            })
        })
        .catch((error) => {
          console.log(error)
        })
    },
    updateMeetupData ({ commit }, payload) {
      commit('setLoading', true)
      let updateObg = {}
      if (payload.title) {
        updateObg.title = payload.title
      }
      if (payload.description) {
        updateObg.description = payload.description
      }
      if (payload.date) {
        updateObg.date = payload.date
      }
      firebase.database().ref('meetups').child(payload.id).update(updateObg)
        .then(() => {
          commit('setLoading', false)
          commit('updateMeetup', payload)
        })
        .catch(error => {
          console.log(error)
          commit('setLoading', false)
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
    clearError ({ commit }) {
      commit('clearError')
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
    loadedMeetups (state) {
      return state.loadedMeetups.sort((meetupA, meetupB) => {
        return meetupA.date > meetupB.date
      })
    },
    featureMeetups (state, getters) {
      return getters.loadedMeetups.slice(0, 5)
    },
    loadedMeetup (state) {
      return (meetupId) => {
        return state.loadedMeetups.find((meetup) => {
          return meetup.id === meetupId
        })
      }
    },
    user (state) {
      return state.user
    },
    loading (state) {
      return state.loading
    },
    error (state) {
      return state.error
    }
  }
})
