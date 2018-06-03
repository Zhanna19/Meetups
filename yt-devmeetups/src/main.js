import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import { store } from './store'
import DateFilter from './filters/date'
import * as firebase from 'firebase'
import AlertComp from './components/Shared/Alert'
import EditMeetupDialoge from './components/Meetup/Edit/EditMeetup'
import EditMeetupDate from './components/Meetup/Edit/EditMeetupDate'
import EditMeetupTime from './components/Meetup/Edit/EditMeetupTime'
import RegistrationDialog from './components/Registration/RegistrationDialog'

import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)

Vue.filter('date', DateFilter)
Vue.component('app-alert', AlertComp)
Vue.component('edit-meetup-dialoge', EditMeetupDialoge)
Vue.component('edit-meetup-date', EditMeetupDate)
Vue.component('edit-meetup-time', EditMeetupTime)
Vue.component('app-register', RegistrationDialog)

Vue.config.productionTip = false

/* eslint-disable no-new */
const config = {
  apiKey: 'AIzaSyDyLQjkMFruirTcyS0nhw0CtaRd4deekt4',
  authDomain: 'devmeetup-8fba8.firebaseapp.com',
  databaseURL: 'https://devmeetup-8fba8.firebaseio.com',
  projectId: 'devmeetup-8fba8',
  storageBucket: 'gs://devmeetup-8fba8.appspot.com/',
  messagingSenderId: '974827570039'
}

firebase.initializeApp(config)

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created () {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('autoSignIn', user)
        this.$store.dispatch('fetchUserData')
      }
    })
    this.$store.dispatch('loadMeetups')
  }
})
