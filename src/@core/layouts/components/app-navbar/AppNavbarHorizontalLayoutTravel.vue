<template>
   <div class="navbar-container d-flex content align-items-center">

      <!-- Nav Menu Toggler -->
      <ul class="nav navbar-nav d-xl-none">
         <li class="nav-item">
            <b-link class="nav-link d-none" @click="toggleVerticalMenuActive">
               <feather-icon icon="MenuIcon" size="21" />
            </b-link>
         </li>
      </ul>

      <!-- Right Col -->
      <b-navbar-nav class="nav align-items-center ml-auto">
         <dark-Toggler class="d-none d-lg-block" />
         <user-dropdown />
      </b-navbar-nav>
   </div>
</template>

<script>
import {
   BLink, BNavbarNav, BNavItem,
   VBTooltip
} from 'bootstrap-vue'
import DarkToggler from './components/DarkToggler.vue'
import UserDropdown from './components/UserDropdown.vue'
import useAuth from '@core/utils/useAuth'

import {toRefs,onMounted,watch} from 'vue'
import store from '@/store'

export default {
   components: {
      BLink,
      // Navbar Components
      BNavbarNav,
      DarkToggler,
      UserDropdown,
      BNavItem,
   },
   directives:{
      'b-tooltip':VBTooltip
   },

   props: {
      toggleVerticalMenuActive: {
         type: Function,
         default: () => { },
      },
   },


   setup(){
   
      const {
         is_loggin
      } = useAuth()

      return {
         is_loggin,
      }
   }


}
</script>
