<template>
   <b-container fluid>
      <b-row>
         <b-col cols="12" class="mb-0">
            <div class="d-flex flex-column flex-sm-row justify-content-center align-items-center pt-1 ">

               <span class="d-block d-md-inline-block mt-25">
                  COPYRIGHT © {{ new Date().getFullYear() }}
                  <b-link class="ml-25" href="#" target="_blank">{{ app_name }}</b-link>
                  <span class="d-none d-sm-inline-block">, {{ $t('Todos los derechos reservados') }}</span>
               </span>
            </div>
         </b-col>
      </b-row>
   </b-container>
</template>

<script>
import { 
   BContainer,
   BRow,
   BCol,
   BLink
} from 'bootstrap-vue'
import { $themeConfig } from '@themeConfig'
import { toRefs } from 'vue'
import store from '@/store'

export default {
   components: {
      BContainer,
      BRow,
      BCol,
      BLink
   },

   
   setup(){
      const {
         appName:app_name
      } = $themeConfig.app;

      const { windowWidth } = toRefs(store.state.app)

      return {
         windowWidth,
         app_name,
      }
   }
}
</script>
