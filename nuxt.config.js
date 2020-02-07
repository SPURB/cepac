import axios from 'axios'
const baseUrl = process.env.CI ? '/relatorios/' : '/'

const apiBaseUrl = (env) => {
  switch (env) {
    case 'dev': return 'http://spurbsp163/cepacs/api/'
    default: return 'https://servicos.spurbanismo.sp.gov.br/cepacs/api'
  }
}

export default {
  mode: 'spa',
  env: {
    apiBaseUrl: apiBaseUrl(process.env.NODE_ENV)
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
  plugins: [
    '~/plugins/numFilters.js',
    '~/plugins/visibility-change.js'
  ],
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
      return axios.get('https://servicos.spurbanismo.sp.gov.br/cepacs/api/fila', { timeout: 600000 }) // 10min
        .then(res => res.data.map(fila => `/ouc-faria-lima/${fila.Id}`))
        .catch(err => new Error(err))
    },
    interval: 100 // cria intervalo de 1s para cada requisição
  },
  router: {
    base: baseUrl,
    fallback: true
  },
  buildModules: [
    ['@nuxtjs/google-analytics', {
      id: 'UA-113737634-9'
    }]
  ],
  pwa: {
    manifest: {
      name: 'Relatórios de dados públicos da São Paulo Urbanismo',
      lang: 'ptbr',
      short_name: "São Paulo Urbanismo",
    }
  }
}
