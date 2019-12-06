<template>
  <div class="cadastro-oucfl main--content">
    <PageTitle :two-columns="true">
      <div class="col-1">
        <h1>Operação Urbana Consociada Faria Lima</h1>
        <h2>Lei 13.769/04, alterada pelas leis 13.871/04, 15.519/11 e 16.242/15</h2>
      </div>
      <div class="col-2">
        <p>Fonte:</p>
        <ul>
          <li class="fonte">
            <a :href="`https://servicos.spurbanismo.sp.gov.br/cepacs/api/fila/${this.$route.params.id}`" target="_blank">{{ filaItemUrl.replace('https://', '') }}</a>
          </li>
          <li v-if="sqls.length" class="fonte">
            <a :href="`https://servicos.spurbanismo.sp.gov.br/cepacs/api/sqls?IdFilaCepac=${this.$route.params.id}`" target="_blank">{{ sqlsItemUrl.replace('https://', '') }}</a>
          </li>
        </ul>
      </div>
    </PageTitle>
    <cadastro
      :fila="fila"
      :sqls="sqls"
      doc-title="Operação Urbana Consociada Faria Lima"
      doc-sub-title="Lei 13.769/04, alterada pelas leis 13.871, 15.519/11 e 16.242/15"
    />
    <FooterActions
      :actions="pageActions"
      :go-back-path="'/ouc-faria-lima'"
      :go-forward="{ path:'/ouc-faria-lima/controle-de-estoques-aca', text:'Resumo de estoques' }"
      :pdf="true"
      :use-css="true"
    />
  </div>
</template>
<script>
import axios from '~/plugins/axios'
import PageTitle from '~/components/sections/PageTitle'
import Cadastro from '~/components/sections/Cadastro'
import FooterActions from '~/components/sections/FooterActions'
import { helpers } from '~/plugins/mixins'

export default {
  name: 'CadastroOucfl',
  components: {
    Cadastro,
    PageTitle,
    FooterActions
  },
  mixins: [ helpers ],
  data () {
    return {
      fila: {},
      sqls: [],
      pageActions: [], // { fileName, content }
      outputFila: {}
    }
  },
  computed: {
    filaItemUrl () {
      return `Dados referentes ao cadastro ${this.$route.params.id}`
    },
    sqlsItemUrl () {
      const haveSql = this.sqls.length > 1
      return `${this.pluralize('IPTU', haveSql)} ${this.pluralize('associado', haveSql)} ao cadastro ${this.$route.params.id}`
    }
  },
  async asyncData ({ params }) {
    const fila = await axios.get(`fila/${params.id}`)
    const sqls = await axios.get(`sqls?IdFilaCepac=${params.id}`)
    return { fila: fila.data, sqls: sqls.data }
  },
  created () {
    const d = new Date()
    const dateStr = `${d.getFullYear()}-${d.getMonth()}-${d.getDay()}_${d.getHours()}h${d.getMinutes()}`

    const outputFila = this.fila
    outputFila.sqls = this.sqls

    this.pageActions = [{
      fileName: `cadastro-${this.fila.Id}_${dateStr}.json`,
      content: outputFila
    }]
  }
}
</script>
