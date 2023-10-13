<template>
   <div class="auth-wrapper auth-v1 px-2">
    <div class="auth-inner py-2">

      <logo :url="{ name: 'inicio' }" />



      <!-- Login v1 -->
      <b-card class="mb-0">
        <b-card-text class="mb-2 text-center font-weight-bold">
          Inicia sesión en tu cuenta y comienza la aventura
        </b-card-text>

        <!-- form -->
        <validation-observer ref="formValidate" #default="{ invalid,handleSubmit }">
          <b-form class="auth-login-form mt-2" @submit.prevent="handleSubmit(iniciar)">

            <!-- email -->
            <b-form-group label-for="email" label="Email">
              <validation-provider #default="{ errors }" name="email" rules="required|email">
                <b-form-input id="email" v-model="formulario.email" name="login-email"
                  :state="errors.length > 0 ? false : null" placeholder="john@example.com" autofocus />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>

            <!-- password -->
            <b-form-group>
              <validation-provider #default="{ errors }" name="password" rules="required">
                <b-input-group class="input-group-merge" :class="errors.length > 0 ? 'is-invalid' : null">
                  <b-form-input id="password" v-model="formulario.password" :type="passwordFieldType"
                    class="form-control-merge" :state="errors.length > 0 ? false : null" name="login-password"
                    placeholder="Password" />

                  <b-input-group-append is-text>
                    <feather-icon class="cursor-pointer" :icon="passwordToggleIcon" @click="togglePasswordVisibility" />
                  </b-input-group-append>
                </b-input-group>
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>


      <!-- submit buttons -->
            <b-button type="submit" variant="primary" block :disabled="invalid" v-loading="loading" class="mt-3">
              {{ $t('Iniciar') }}
            </b-button>

            <b-button @click="authenticarGoogle(optionsAuth)" variant="primary" block v-loading="loading" class="mt-1">
              {{ $t('Google Auth') }}
            </b-button>
          </b-form>
        </validation-observer>
      </b-card>
      <!-- /Login v1 -->
    </div>
  </div>


</template>

<script>
/* eslint-disable global-require */
import { ValidationProvider, ValidationObserver } from 'vee-validate'

import {
  BRow,
  BCol,
  BLink,
  BFormGroup,
  BFormInput,
  BInputGroupAppend,
  BInputGroup,
  BFormCheckbox,
  BCardText,
  BCardTitle,
  BImg,
  BForm,
  BButton,
  BAlert,
  VBTooltip,
  BFormInvalidFeedback,
  BCard
} from 'bootstrap-vue'

import { required, email } from '@validations'

import store from '@/store/index'
import { computed, toRefs, onMounted } from 'vue';
import useAuth from '@core/utils/useAuth'

import '@core/scss/vue/libs/toastification.scss'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

import router from '@/router'
import { getHomeRouteForLoggedInUser } from '@/auth/utils'
import { $themeConfig } from '@themeConfig'
import useTogglePassword from '@core/utils/useTogglePassword.js'

import logotipo from '@images/logos/logotipo.png'


export default {
  directives: {
    'b-tooltip': VBTooltip,
  },
  components: {
    BRow,
    BCol,
    BCard,
    BLink,
    BFormGroup,
    BFormInput,
    BInputGroupAppend,
    BInputGroup,
    BFormCheckbox,
    BCardText,
    BCardTitle,
    BImg,
    BForm,
    BButton,
    BAlert,
    ValidationProvider,
    ValidationObserver,
    BFormInvalidFeedback,
    Logo: () => import('components/Logo.vue')
  },



  setup(props) {

    const usuario = computed(() => store.state.usuario.usuario)
    const { appName  } = $themeConfig.app

    const {
      passwordFieldType,
      togglePasswordVisibility,
      passwordToggleIcon
    } = useTogglePassword();

    const {
      login,
      formValidate,
      formulario,
      authGoogle,
      authenticarGoogle,
      optionsAuth
    } = useAuth();

    const iniciar = () => {

      login().then((result) => {

        if (result) {

          router.replace(getHomeRouteForLoggedInUser('Usuario')).then(
            () => {
              toast({
                component: ToastificationContent,
                props: {
                  title: `Bienvenido ${usuario.value.nombre}`,
                  icon: 'CoffeeIcon',
                  variant: 'success',
                  text: `¡Ahora puedes empezar a explorar!`,
                },
              }, {
                position: 'bottom-right',
                timeout: 4000
              })
            })

        } else {

          toast({
            component: ToastificationContent,
            props: {
              title: `No pudimos autenticarte, inténtelo de nuevo`,
              icon: 'HelpCircleIcon',
              variant: 'danger',
            },
          }, {
            position: 'bottom-right',
            timeout: 4000
          })

        }


      }).catch(e => {

        if (e.response.status === 401) {
          if (!e.response.data.result) {
            toast.info(e.response.data.message)
          }

        }

      })
    }

    return {
      login,
      required,
      loading: computed(() => store.state.loading),
      auth: computed(() => store.state.auth),
      formValidate,
      formulario,
      iniciar,
      authGoogle,
      appName,
      authenticarGoogle,
      optionsAuth,

      passwordFieldType,
      togglePasswordVisibility,
      passwordToggleIcon


    }
  }


}
</script>

<style lang="scss">
@import '@core/scss/vue/pages/page-auth.scss';

.brand-logo img {
  width: auto;
  height: auto;
}
</style>