import { get } from 'axios'
const baseUrl = process.env.NODE_ENV === 'prod' ? '/cepacs/' : '/'

export default {
  mode: 'spa',
  target: 'static',
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
  loading: { color: '#038375' },
  css: [ '@/assets/base.scss' ],
  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/google-analytics',
    '@nuxtjs/axios',
    '@nuxtjs/pwa'
  ],
  plugins: [
    '~/plugins/numFilters.js',
    '~/plugins/visibility-change.js'
  ],
  googleAnalytics: {
    id: 'UA-113737634-10'
  },
  generate: {
    routes () {
      return get('https://servicos.spurbanismo.sp.gov.br/cepacs/api/fila', { timeout: 600000 }) // 10min
        .then(res => res.data.map(fila => `/ouc-faria-lima/${fila.Id}`))
        .catch(err => new Error(err))
    },
    interval: 100 // cria intervalo de 1s para cada requisição
  },
  router: {
    base: baseUrl,
    fallback: true
  },
  pwa: {
    manifest: {
      name: 'Relatórios de dados públicos da São Paulo Urbanismo',
      lang: 'ptbr',
      short_name: 'São Paulo Urbanismo'
    }
  }
}
