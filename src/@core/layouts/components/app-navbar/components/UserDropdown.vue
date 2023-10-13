<template>
  <section>
  <b-nav-item-dropdown right toggle-class="d-flex align-items-center dropdown-user-link" class="dropdown-user">
    <template #button-content>
      <div class="d-sm-flex d-none user-nav" v-if="is_loggin">
        <p class="user-name font-weight-bolder mb-0">
          {{ usuario.nombre }}
        </p>
      </div>

      <b-avatar size="40" :src=" is_loggin && usuario.avatar ? usuario.avatar : avatarDefault" variant="light-primary"
        badge class="badge-minimal" :badge-variant="is_loggin ? 'success' : 'danger'"
        :text="avatarText(usuario.nombre+' '+usuario.apellido)">
        <feather-icon v-if="!is_loggin" icon="UserIcon" size="22" />
      </b-avatar>

    </template>

    <b-dropdown-item link-class="d-flex align-items-center" @click="logout" v-loading="loading" v-if="is_loggin">
      <feather-icon size="16" icon="LogOutIcon" class="mr-50" />
      <span>{{ $t('Cerrar sesión') }}</span>
    </b-dropdown-item>

    <b-dropdown-item :to="{ name: 'login' }" link-class="d-flex align-items-center" v-if="!is_loggin">
      <feather-icon size="16" icon="LogInIcon" class="mr-50" />
      <span>{{ $t('Login') }}</span>
    </b-dropdown-item>

  </b-nav-item-dropdown>
   
  </section>
</template>

<script>
import {
  BNavItemDropdown, BDropdownItem, BDropdownDivider, BAvatar,
  BPopover,VBPopover
} from 'bootstrap-vue'

import { avatarText } from '@core/utils/filter'
import { computed,toRefs,ref,inject } from 'vue';
import store from '@/store';
import useAuth from '@core/utils/useAuth'
import avatarDefault from '@images/avatars/default.jpg'

export default {
  components: {
    BNavItemDropdown,
    BDropdownItem,
    BDropdownDivider,
    BAvatar,
    BPopover,
  }, 

  directives:{
    'b-popover':VBPopover
  },

  props:{
    
    panel:{
      type:String,
      default:'travel',
    },

    negocioId:{
      type:Number,
      required:false
    }

  },


  setup(props){
    const usuario = computed(() => store.state.usuario.usuario)


    const {
      logout,
      is_loggin,
    } = useAuth();
    return {
      usuario,
      loading:computed(() => store.state.loading),
      avatarText,
      logout,
      is_loggin,
      avatarDefault
    };
  },


}
</script>
