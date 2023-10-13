<template>
  <b-card ref="contentVideo" class="w-100 v-dark " no-body style="height:85vh; cursor:pointer"  @click="play()">

    <section v-for="(video, i) in videos"  :key="i">
      <vimeo-player autoplay :loop="false" :video-id="video" ref="refVideo" v-if="i == indexV" style="width:100% !important" @ended="cambiarVideo()" :controls="false" :player-width="width" :player-height="height">
      </vimeo-player>
    </section>
    
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

    const videos = ref([])
    const refVideo = ref(null)
    const indexV = ref(0)
    const cantVideos = ref(0)
    const contentVideo = ref(null)
    const { width, height } = useElementSize(contentVideo)
    const swal = inject('swal')

    const video = ref({
      id:null,
      duration:0
    })

    const cargarVideos = () => {
      axios.get(`/api/playlist/current`).then(({data}) => {
        const {currentPlayList,valido} = data;

        if(valido){
          videos.value = currentPlayList.map(v => obtenerVideoId(v))
          cantVideos.value = videos.value.length
          insertarVideo()
        }

      }).catch(e => console.log(e))

    }

    const play = _.debounce(() => {
      // refVideo.value.play();
    },500)

    const obtenerVideoId = (urlCompleta)  => {
      const match = urlCompleta.match(/\/(\d+)\?/);
      if (match && match[1]) {
        return match[1];
      } else {
        return null;
      }
    }

    const insertarVideo = () => {
      video.value.id = videos.value[indexV.value]
    }
    const cambiarVideo = () => {
      if(indexV.value == (cantVideos.value - 1)){
        indexV.value = 0
      }else{
        indexV.value++;
      }
      insertarVideo();
      play();
    }

    onMounted(() => {
      cargarVideos()
        swal({
        title: '¿Acepta la reproducción automática de esta aplicación?',
        showDenyButton: true ,
        showCancelButton: false,
        confirmButtonText: 'Sí',
        denyButtonText: `Nó`,
        allowOutsideClick:false

      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          play()
        } else if (result.isDenied) {
          swal('El vídeo nunca se reproducirá', '', 'info')
        }
      })
    });

    return {
      loading: computed(() => store.state.loading),
      videos,
      refVideo,
      video,
      cambiarVideo,
      contentVideo,
      width, height,
      play,
      indexV
    }
  }
 
}
</script>

<style lang="scss">
  .v-dark{
    background-color: rgba(0, 0, 0, 0.823) !important;
  }
</style>