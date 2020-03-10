<template>
  <div class="index">
    <preloader :is-fething="true" />
    <page-title :two-columns="true">
      <div class="col-1">
        <h1>Operação Urbana Consociada Faria Lima</h1>
        <h2>Controle de Estoques</h2>
      </div>
      <div class="col-2">
        <p class="fonte">
          Fonte: <a href="https://servicos.spurbanismo.sp.gov.br/cepacs/api/fila" target="_blank">servicos.spurbanismo.sp.gov.br/cepacs/api/fila</a>
        </p>
      </div>
    </page-title>
    <index-table
      :table-name="addDateToName(tableName)"
      :query-filter="'?'"
      :build-filtros="[
        {
          title: 'Situação',
          values: [
            { name: 'Checklist', value: 'IdStatus=1' },
            { name: 'Em análise', value: 'IdStatus=2' },
            { name: 'Indeferidos', value: 'IdStatus=3' },
            { name: 'Aprovados', value: 'IdStatus=4' },
            { name: 'Cancelados', value: 'IdStatus=5' }
          ]
        },
        {
          title: 'Setor',
          values: [
            { name: 'Hélio Pelegrino', value: 'IdSetor=1' },
            { name: 'Faria Lima', value: 'IdSetor=2' },
            { name: 'Pinheiros', value: 'IdSetor=3' },
            { name: 'Olimpíadas', value: 'IdSetor=4' }
          ]
        }
      ]
      "
    />
    <message-bar v-if="displayCanceladosMessage" :message="'Os itens CANCELADOS estão em processo de revisão'" />
  </div>
</template>
<script>
import PageTitle from '~/components/sections/PageTitle'
import IndexTable from '~/components/sections/IndexTable'
import Preloader from '~/components/sections/Preloader'
import MessageBar from '~/components/elements/MessageBar'

export default {
  name: 'OucFariaLima',
  components: {
    PageTitle,
    IndexTable,
    Preloader,
    MessageBar
  },
  data () {
    return {
      tableName: 'ouc-faria-lima'
    }
  },
  computed: {
    displayCanceladosMessage () {
      return this.$route.query.IdStatus === '5'
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
