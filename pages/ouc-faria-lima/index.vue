<template>
  <div class="index">
    <h1 />
    <index-table :table-name="addDateToName(tableName)" />
  </div>
</template>
<script>
import IndexTable from '~/components/IndexTable'

export default {
  name: 'OucFariaLima',
  components: {
    IndexTable
  },
  data () {
    return {
      tableName: 'ouc-faria-lima'
    }
  },
  methods: {
    addDateToName (name) {
      const date = new Date()
      const yyyy = date.getFullYear()
      const mm = date.getMonth()
      const dd = date.getDay()
      const ho = date.getHours()
      const mi = date.getMinutes()
      return `${name}_${yyyy}-${mm}-${dd}_${ho}h${mi}`
    }
  },
  head () {
    return {
      title: 'OUC Faria Lima | Estoques desvinculados',
      meta: [{ hid: 'relatorios', name: 'relatorios', content: "Operação Urbana Consorciada Faria Lima CEPAC'S desvinculados" }]
    }
  }
}
</script>
