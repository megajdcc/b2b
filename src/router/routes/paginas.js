export default [

      {
         path: '/',
         name: 'inicio',
         component: () => import('views/paginas/index.vue'),
         meta: {
         layout:'travel',
            resource:'home',
            action:'read'
         },
      },
      {
      path: '/error-404',
      name: 'error-404',
      component: () => import('@views-core/error/Error404.vue'),
      meta: {
         layout: 'full',
         resource: 'Auth',
         action: 'read',
      },
   },
   {
      path: '/login',
      name: 'login',
      component: () => import('@views-core/pages/authentication/Login.vue'),
      meta: {
         layout: 'full',
         resource: 'Auth',
         redirectIfLoggedIn: true,
      },
   },

   {
      path: '/pages/miscellaneous/not-authorized',
      name: 'misc-not-authorized',
      component: () => import('@views-core/pages/miscellaneous/NotAuthorized.vue'),
      meta: {
         layout: 'full',
         resource: 'Auth',
      },
   },



   /*****************************************/
   /* PAGINA DE Mantenimiento
   /*************************************** */
   {
      path:'/mantenimiento',
      name:'show.mantenimiento',
      component:() => import('views/mantenimiento/index.vue'),
      meta:{
         layout:'full',
      }
   },
   

]
