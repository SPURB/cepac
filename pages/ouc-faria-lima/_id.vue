<template>
  <div class="IdOucfl">
    <PageTitle :two-columns="true">
      <div class="col-1">
        <h1>Operação Urbana Consociada Faria Lima</h1>
        <h2>Lei 13.769/04, alterada pelas leis 13.871, 15.519/11 e 16.242/15</h2>
      </div>
      <div class="col-2">
        <p class="fonte">
          <a :href="postwomanUrl"><img src="https://img.shields.io/badge/Documentação da api-Postwoman-hex_color_code?logo=Postwoman" alt="Postwoman"></a>
        </p>
      </div>
    </PageTitle>
    <div class="main">
      <div class="a4">
        <ul id="v-for-object" class="report">
          <li v-for="(value, key) in fila" :key="key">
            <h3>{{ glossarioFila[key] }}</h3>
            <p>{{ value }}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import axios from '~/plugins/axios'
import { fila as glossarioFila } from '~/static/data/glossario'
import PageTitle from '~/components/sections/PageTitle'
export default {
  name: 'IdOucfl',
  components: {
    PageTitle
  },
  data () {
    return {
      fila: {},
      sqls: [],
      glossarioFila
    }
  },
  computed: {
    postwomanUrl () {
      return `https://postwoman.io/?method=GET&amp;url=https%3A%2F%2Fservicos.spurbanismo.sp.gov.br%2F&amp;path=cepacs%2Fapi%2Ffila%2F${this.$route.params.id}`
    }
  },
  async asyncData ({ params }) {
    const fila = await axios.get(`fila/${params.id}`)
    const sqls = await axios.get(`sqls?IdFilaCepac=${params.id}`)

    const filaClean = {}
    const filaResponse = fila.data

    for (const key in filaResponse) {
      if (filaResponse[key] !== null || typeof (filaResponse[key]) === 'number') {
        filaClean[key] = filaResponse[key]
      }
    }
    return { fila: filaClean, sqls: sqls.data }
  }
}
</script>
<style lang="scss" scoped>
.main {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: 1fr;
  grid-column-gap: 16px;
  box-sizing: content-box
}

.a4 {
  grid-area: 1 / 4 / 2 / 10;
  margin-top: 3rem;
  margin-bottom: 3rem;
  height: calc((100vw / 12) * 6 * 1.41);
  background: #FFFFFF;
  border: 1px solid #EBE6E6;
  box-shadow: 4px 4px 8px rgba(125, 124, 124, 0.25);
  display: grid;
}
</style>
