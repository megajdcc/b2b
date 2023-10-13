<template>
  <b-card ref="contentVideo" class="w-100 " no-body style="height:85vh; cursor:pointer" bg-variant="dark" @click="play()">
    
      <vimeo-player :video-id="video.id" ref="refVideo" v-if="video.id" style="width:100% !important" @ended="cambiarVideo()" :controls="true" :player-width="width" :player-height="height">

      </vimeo-player>
    
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
      refVideo.value.play();
    },500)

    const obtenerVideoId = (urlCompleta)  => {
      // Buscar el ID del video en la URL utilizando una expresión regular
      const match = urlCompleta.match(/\/(\d+)\?/);

      if (match && match[1]) {
        // El ID del video se encuentra en el primer grupo coincidente
        return match[1];
      } else {
        // Si no se encuentra un ID válido, devuelve null o una cadena vacía, según prefieras
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
      play
    }
  }
 
}
</script>