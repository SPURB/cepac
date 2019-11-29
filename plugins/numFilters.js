import Vue from 'vue'
import numeral from 'numeral'

Vue.filter('formatNumber', function (value) {
  return numeral(value).format('0,0.00')
})

Vue.filter('dateTimeStr', (databd) => { // 2019-11-19T18:58:44.227416
  const dt = databd.split(/[: T-]/).map(parseFloat)
  const gmt = new Date(dt[0], dt[1] - 1, dt[2], dt[3] || 0, dt[4] || 0, dt[5] || 0, 0)
  const meses = [
    'janeiro',
    'fevereiro',
    'março',
    'abril',
    'maio',
    'junho',
    'julho',
    'agosto',
    'setembro',
    'outubro',
    'novembro',
    'dezembro'
  ]
  return `${gmt.getUTCDate()} de ${meses[gmt.getMonth()]} de ${gmt.getUTCFullYear()}`

  // return databd.replace(/(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):\d{2}(\w{3})/, ($1, $2, $3) => `Atualizado em ${$3} de ${meses[$2 - 1]} ${$1}`
  // )
})// 2019-11-19T18:58:44.227416 para Atualizado em 28 de janeiro 2011
