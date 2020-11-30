import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from 'firebase'

Vue.config.productionTip = false

var firebaseConfig = {
  apiKey: "AIzaSyCuUfpMqGdrNOlYuZuCRhIK0RvNApeT65M",
  authDomain: "vue-kadai4.firebaseapp.com",
  databaseURL: "https://vue-kadai4.firebaseio.com",
  projectId: "vue-kadai4",
  storageBucket: "vue-kadai4.appspot.com",
  messagingSenderId: "927898598958",
  appId: "1:927898598958:web:ade74d31bea258fec629bf"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
