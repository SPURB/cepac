export default function ({ $axios }, inject) {
  const geo = $axios.create({ baseURL: process.env.apiGeoUrl })
  const cepacs = $axios.create({
    baseURL: process.env.apiBaseUrl,
    withCredentials: false
  })

  inject('geo', geo)
  inject('cepacs', cepacs)
}