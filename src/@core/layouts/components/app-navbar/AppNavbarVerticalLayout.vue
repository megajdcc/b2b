<template>
  <div class="navbar-container d-flex content align-items-center">

    <!-- Nav Menu Toggler -->
    <ul class="nav navbar-nav d-xl-none">
      <li class="nav-item">
        <b-link class="nav-link" @click="toggleVerticalMenuActive">
          <feather-icon icon="MenuIcon" size="21" />
        </b-link>
      </li>
    </ul>

    <!-- Left Col -->
    <b-navbar-nav class="nav align-items-center ml-auto">
      <dark-Toggler class="d-none d-lg-block" />
      <user-dropdown />
    </b-navbar-nav>
  </div>
</template>

<script>

import {
  BLink, BNavbarNav, BNavItem
} from 'bootstrap-vue'

import UserDropdown from './components/UserDropdown.vue'
import {mapState, mapMutations, mapActions, mapGetters} from 'vuex';

import DarkToggler from './components/DarkToggler.vue'

import useAuth from '@core/utils/useAuth.js'

export default {

  components: {
    BLink,
    BNavbarNav,
    DarkToggler,
    UserDropdown,
    BNavItem,
  },
  props: {
    toggleVerticalMenuActive: {
      type: Function,
      default: () => {},
    },
  },


  

  computed:{
    ...mapState('usuario',['usuario'])
  },


  setup(){

    const {
      is_loggin 
    } = useAuth();
    
    return {
      is_loggin
    }
  }




	


}
</script>

