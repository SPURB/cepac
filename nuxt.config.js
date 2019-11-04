const baseUrl = process.env.CI ? '/relatorios/' : '/'

export default {
  mode: 'spa',
  env: {
    apiBaseUrl: process.env.NODE_ENV === 'dev' ? 'http://spurbsp163/filacepac/api' : 'http://servicos.spurbanismo.sp.gov.br/cepac/api'
  },
  head: {
    htmlAttrs: {
      lang: 'pt-br'
    },
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: `${baseUrl}favicon.ico` }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#038375' },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa'
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
  },
  /*
  ** Build configuration
  */
  build: {
  /*
  ** You can extend webpack config here
  */
    extend (config, ctx) {
    }
  },
  router: {
    base: baseUrl
  }
}
