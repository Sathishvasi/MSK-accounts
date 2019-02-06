import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vuetify from 'vuetify'

import store from './store'
import Vuex from 'vuex';
import filter from './filters'


import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)
Vue.config.productionTip = false


Vue.use(Vuex)


new Vue({
  router,
  store,
  filter,
  render: h => h(App),
}).$mount('#app')



// new Vue({
//   el: '#app',
//   router,
//   components: {
//     App
//   },
//   template: '<App/>'
// })



