import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import { store } from './store'
import DateFilter from './filters/date'
import * as firebase from 'firebase'
import AlertComp from './components/Shared/Alert'

import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)

Vue.filter('date', DateFilter)
Vue.component('app-alert', AlertComp)

Vue.config.productionTip = false

/* eslint-disable no-new */
const config = {
  apiKey: 'AIzaSyDyLQjkMFruirTcyS0nhw0CtaRd4deekt4',
  authDomain: 'devmeetup-8fba8.firebaseapp.com',
  databaseURL: 'https://devmeetup-8fba8.firebaseio.com',
  projectId: 'devmeetup-8fba8',
  storageBucket: 'devmeetup-8fba8.appspot.com',
  messagingSenderId: '974827570039'
}

firebase.initializeApp(config)

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)

})
