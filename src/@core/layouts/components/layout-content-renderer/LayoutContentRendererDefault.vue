<template>
  <div
    class="app-content content "
    :class="[{'show-overlay': $store.state.app.shallShowOverlay}, $route.meta.contentClass]"
  >
    
    <div class="content-overlay" />
    
    <div class="header-navbar-shadow" />

    <div class="content-wrapper mt-0 px-0 py-=0" :class="contentWidth === 'boxed' ? 'container p-0' : null" style="min-height:75vh" >
      <slot name="breadcrumb">
        <app-breadcrumb />
      </slot>

      <div class="content-body px-0 mx-0">
        <transition :name="routerTransition" mode="out-in">
          <slot />
        </transition>
      </div>

    </div>
  </div>
</template>

<script>
import AppBreadcrumb from '@core/layouts/components/AppBreadcrumb.vue'
import useAppConfig from '@core/app-config/useAppConfig'

export default {
  components: {
    AppBreadcrumb,
  },
  setup() {
    const { routerTransition, contentWidth } = useAppConfig()

    return {
      routerTransition, contentWidth,
    }
  },
}
</script>

<style>

</style>
