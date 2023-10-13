import Vue from 'vue'
import Vuex from 'vuex'

// Modules
import app from './app'
import appConfig from './app-config'
import verticalMenu from './vertical-menu'

// Import Modulos
import usuario from './modules/usuario';

Vue.use(Vuex)

export default new Vuex.Store({
  
	state: {
		errors: {},
		loading: false,
    token:null,
    canales:[],
    auth:{
      message:null
    }
	},

	mutations: {

		cerrarApp(state) {
			state.usuario = null
		},

		toggleLoading(state,bol = null) {
			state.loading = (bol != null) ? bol : !state.loading
		},

    setToken(state,token){
      state.token = token
    },

	},

	actions: {

    async cerrarSesion({ state, commit }) {
      
      return await axios.get('/api/auth/logout',null,{
        headers: {
          'WWW-Authenticate': 'Bearer', 'Authorization': (state.token) ? state.token : localStorage.getItem('accessToken')
        }
      });

    },
	},

  
  modules: {
    app,
    appConfig,
    verticalMenu,
    usuario,
  },
  strict:false,

})
