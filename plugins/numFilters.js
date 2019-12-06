import Vue from 'vue'
import numeral from 'numeral'

numeral.register('locale', 'pt-br', {
  delimiters: {
    thousands: '.',
    decimal: ','
  }
})
numeral.locale('pt-br')

Vue.filter('formatNumber', function (value) {
  return numeral(value).format('0,0.00')
})

/*
* Converte
  2019-11-19T18:58:44.227416
  para
  19 de novembro de 2019
*/
Vue.filter('dateTimeStr', (databd) => {
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
})
