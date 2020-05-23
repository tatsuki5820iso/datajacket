import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import VueRouter from 'vue-router'
import router from './route/router'

Vue.config.productionTip = false

Vue.use(VueRouter)

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
