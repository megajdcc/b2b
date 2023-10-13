<template>
  <div class="navbar-container d-flex content align-items-center">

    <!-- Nav Menu Toggler -->
    <ul class="nav navbar-nav d-none d-xl-none">
      <li class="nav-item">
        <b-link class="nav-link" @click="toggleVerticalMenuActive">
          <feather-icon icon="MenuIcon" size="21" />
        </b-link>
      </li>
    </ul>


    <b-navbar-nav class="nav align-items-center mr-auto d-none d-sm-flex d-lg-none" style="">
      <!-- <search-bar /> -->
    </b-navbar-nav>

    <!-- Left Col -->
    <b-navbar-nav class="nav align-items-center d-none d-lg-flex flex-grow-1 justify-content-end" style="">
      <!-- <search-bar /> -->
    </b-navbar-nav>

    <div class="bookmark-wrapper align-items-center flex-lg-grow-0 flex-grow-1 d-none d-lg-flex justify-content-end">
      <!-- <bookmarks /> -->
    </div>

    <!-- Right Col -->
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
import DarkToggler from './components/DarkToggler.vue'
import UserDropdown from './components/UserDropdown.vue'

import useAuth from '@core/utils/useAuth.js'

import store from '@/store'
import { toRefs } from 'vue'

export default {
  components: {
    BLink,
    // Navbar Components
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


  setup(){

    const {
      is_loggin
    } = useAuth();
    
    return {
      is_loggin,
    }
  }

}
</script>


<style lang="scss">
  .vertical-overlay-menu .navbar .navbar-header {
      min-width: 180px !important;
  }
</style>