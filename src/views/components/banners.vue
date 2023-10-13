<template>
  <b-card ref="contentBanners" class="w-100 " no-body style="height:85vh; cursor:pointer" bg-variant="dark">
      <section ref="contentBanner" class="rep-banner" :style="{
        width:'100%',
        height:'100%',
        backgroundImage:`url('${banner.url}')`
      }"></section>
  </b-card>
</template>

<script>

import  {ref,toRefs,computed,onMounted,inject}  from 'vue'
import store from  '@/store'
import { useElementSize } from '@vueuse/core'
import {
  BCard,
  BModal
} from 'bootstrap-vue'

export default {


  components:{
    BCard,
    BModal
  },

  
  setup(){

    const banners = ref([])
    const refBanner = ref(null)
    const indexV = ref(0)
    const cantBanners = ref(0)
    const timeOutBanner = ref(30000) // mls
    const time = ref(0)
    const contentBanners = ref(null)
    const { width, height } = useElementSize(contentBanners)

    const banner = ref({
      url:null,
    })

    const cargarBanners = () => {
      axios.get(`/api/bannerlist/current`).then(({data}) => {
        const { currentListBanners,valido} = data;

        if(valido){
          banners.value = currentListBanners.map(v => urlFull(v))
          cantBanners.value = banners.value.length
          insertarBanner()
          play()
        }

      }).catch(e => console.log(e))

    }

    const play = () => {
      setTimeout(() => {
          cambiarBanner()       
      }, timeOutBanner.value);
    }

    const urlFull = (url)  => {
      return `${import.meta.env.VITE_API_URL}${url}`
    }

    const insertarBanner = () => {
      banner.value.url = banners.value[indexV.value]
    }
    const cambiarBanner = () => {
      if(indexV.value == (cantBanners.value - 1)){
        indexV.value = 0
      }else{
        indexV.value++;
      }
      insertarBanner();
      play();
    }

    onMounted(() => {
      cargarBanners()
    });

    return {
      loading: computed(() => store.state.loading),
      banners,
      refBanner,
      banner,
      cambiarBanner,
      contentBanners,
      width, height,
      play
    }
  }
 
}
</script>

<style lang="scss">
  .rep-banner{
    background-position: center center;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    border-radius:5px
  }
</style>