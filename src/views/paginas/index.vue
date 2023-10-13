<template>
   <b-container fluid class="px-0 mx-0">
      <b-row>
         
         <b-col cols="12" md="10">
            <reproductor v-if="is_loggin" />
         </b-col>

          <b-col cols="12" md="2">
            <banners v-if="is_loggin"/>
         </b-col>

      </b-row>
   </b-container>
</template>

<script>
import {
   BContainer,
   BRow,
   BCol,
   BCard,
   BFormInput,
   BCarousel,
   BCarouselSlide,
   BImg,
   BLink,
   BBadge,
   BFormRating,
   BButton
} from 'bootstrap-vue'

import { onMounted, onActivated, computed, ref, toRefs, watch,inject } from 'vue'

import store from '@/store'
import router from '@/router'

import useAuth from '@core/utils/useAuth';
import Ripple from 'vue-ripple-directive'
export default {

   components: {
      BContainer,
      BRow,
      BCard,
      BFormInput,
      BCol,
      BCarousel,
      BCarouselSlide,
      BButton,
      BImg,
      BLink,
      BBadge,
      BFormRating,
      reproductor:() => import('components/reproductor.vue'),
      banners: () => import('components/banners.vue'),

   },

   directives: {
      Ripple,
   },

   setup() {

      const { authGoogle, is_loggin } = useAuth()
      const i18n = inject('i18n')
      
      onMounted(() => {
         if(!is_loggin.value){
            router.push('login')
         }
         authGoogle()
      })


      const scrollIr = (to) => {

         refTabs.value.firstTab();

         setTimeout(() => {
            const elem = document.getElementById(to)
            window.scrollTo({
               top: elem.offsetTop - 80,
               behavior: 'smooth',
            })
         }, 200);
         

      }
      return {
         is_loggin,
         scrollIr,
         loading: computed(() => store.state.loading),
      }

   },
}

</script>