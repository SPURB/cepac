<template>
  <div class="index">
    <PageTitle :two-columns="true">
      <div class="col-1">
        <h1>Operação Urbana Consociada Faria Lima</h1>
        <h2>Controle de Estoques</h2>
      </div>
      <div class="col-2">
        <p class="fonte">
          Fonte: <a href="https://servicos.spurbanismo.sp.gov.br/cepacs/api/fila" target="_blank">servicos.spurbanismo.sp.gov.br/cepacs/api/fila</a>
        </p>
      </div>
    </PageTitle>
    <index-table :table-name="addDateToName(tableName)" />
  </div>
</template>
<script>
import PageTitle from '~/components/sections/PageTitle'
import IndexTable from '~/components/sections/IndexTable'

export default {
  name: 'OucFariaLima',
  components: {
    PageTitle,
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
