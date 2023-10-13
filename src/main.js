import Vue from 'vue'
import { ToastPlugin, ModalPlugin } from 'bootstrap-vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import lang from 'element-ui/lib/locale/lang/es';
import locale from 'element-ui/lib/locale';
import '@/assets/scss/app.scss'
Vue.prototype.$eventHub = new Vue();


import './libs/axios.js'
import router from './router'
import store from './store'
import i18n , {loadLocaleAsync} from '@/libs/i18n'

import App from './App.vue'

// Global Components
import './global-components'

// 3rd party plugins

import './libs/acl'
import './libs/toastification'
import './libs/vue-select'
import './libs/sweet-alerts'


import vueVimeoPlayer from 'vue-vimeo-player'

Vue.use(vueVimeoPlayer)


import moment from 'moment'

window.moment = moment
moment.locale('es')

// BSV Plugin Registration
Vue.use(ToastPlugin)
Vue.use(ModalPlugin)
Vue.use(ElementUI);
import '@core/assets/fonts/feather/iconfont.css'
import '@core/scss/core.scss'
import '@/assets/scss/style.scss'


window.clone = function(obj) {
  return JSON.parse(JSON.stringify(obj));
}

import jQuery from 'jquery';
window.$ = window.jQuery = jQuery

import { library } from '@fortawesome/fontawesome-svg-core'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { fas } from '@fortawesome/free-solid-svg-icons'
// import { fab } from '@fortawesome/free-brands-svg-icons'
// import { far } from '@fortawesome/free-regular-svg-icons'

library.add(fas)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

import _ from 'lodash';

window._ = _;

let app = new Vue({
  data:() => ({
    api_uri:import.meta.env.VITE_API_URL
  }),
  router,
  store,
  i18n,
  render: h => h(App),
   provide:() =>  ({swal : Vue.swal,i18n:i18n,loadLocaleAsync:loadLocaleAsync})
}).$mount('#app')
