import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VModal from 'vue-js-modal'
import Multiselect from 'vue-multiselect'
import PrettyCheckbox from 'pretty-checkbox';
import vueXlsxTable from 'vue-xlsx-table'

Vue.component('multiselect', Multiselect)
Vue.use(VModal, { dialog: true })
Vue.use(PrettyCheckbox);
Vue.use(vueXlsxTable, {rABS: false})

Vue.config.productionTip = false

import { store } from './store'

new Vue({
  el: '#app',
  Multiselect,
  store,
  router,
  render: h => h(App)
}).$mount('#app')
