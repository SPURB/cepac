import axios from 'axios'
const baseUrl = process.env.CI ? '/relatorios/' : '/'

export default {
  mode: 'spa',
  env: {
    apiBaseUrl: 'https://servicos.spurbanismo.sp.gov.br/cepacs/api'
  },
  head: {
    htmlAttrs: { lang: 'pt-br' },
    title: 'Relatórios de dados públicos da São Paulo Urbanismo',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: `${baseUrl}favicon.ico` }
    ]
  },
  /* Customize the progress-bar color  */
  loading: { color: '#038375' },
  css: [ '@/assets/base.scss' ],
  /* Nuxt.js dev-modules */
  buildModules: [ '@nuxtjs/eslint-module' ],
  plugins: ['~plugins/numFilters.js'],
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/pwa'
  ],
  build: {
    extend (config, ctx) {
    }
  },
  generate: {
    routes () {
      return axios.get('https://servicos.spurbanismo.sp.gov.br/cepacs/api/fila')
        .then((res) => {
          return res.data.map((fila) => {
            return '/ouc-faria-lima/' + fila.Id
          })
        })
    }
  },
  router: {
    base: baseUrl
  }
}
