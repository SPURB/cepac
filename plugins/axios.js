export default function ({ $axios }, inject) {
  const geo = $axios.create({ baseURL: process.env.apiGeoUrl })
  const cepacs = $axios.create({ baseURL: process.env.apiBaseUrl })
  const arquivos = $axios.create({ baseURL: process.env.apiArquivos })

  inject('geo', geo)
  inject('cepacs', cepacs)
  inject('arquivos', arquivos)
}
