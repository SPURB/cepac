import { get } from 'axios'

const baseUrl = '/cepac/'
const apiBaseUrl = 'https://servicos.spurbanismo.sp.gov.br/cepacs/api'

export default {
  ssr: false,
  target: 'static',
  components: true,
  env: {
    apiBaseUrl,
    apiGeoUrl: 'https://servicos.spurbanismo.sp.gov.br/geo/api' // 'http://localhost:5000/geo/api'
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
  css: [ '@/assets/base.scss', '@/assets/theme.scss' ],
  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/google-analytics',
    '@nuxtjs/pwa'
  ],
  modules: [
    '@nuxtjs/axios'
  ],
  plugins: [
    '~/plugins/numFilters.js',
    '~/plugins/visibility-change.js',
    '~/plugins/vuelayers.js',
    '~/plugins/services'
  ],
  googleAnalytics: {
    id: 'UA-113737634-10'
  },
  generate: {
    async routes () {
      const filaFariaLima = await get(`${apiBaseUrl}/fila`, { timeout: 600000 }) // 10min
        .then(res => {
          return res.data.map(fila => {
            return `/ouc-faria-lima/${fila.Id}`
          })
        })
        .catch(err => new Error(err))
      
      const FariaLima = ['/ouc-faria-lima','/ouc-faria-lima/resumo','/ouc-faria-lima/mapa/1', ...filaFariaLima]

      return [...FariaLima]
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
