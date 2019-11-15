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
        <div class="a4__header">
          <logo-spurb :fill-type="'#1D1D1B'" :fill-brand="'#038375'" />
        </div>
        <ul class="a4__report">
          <li class="report__item">
            <h3>Cadastro</h3>
            <p class="item__text--big">
              {{ fila.Id }}
            </p>
          </li>
          <li class="report__item">
            <h3>Situação</h3>
            <p class="item__text--big">
              {{ statusDescription[fila.IdStatus] }}
            </p>
          </li>
          <li class="report__item">
            <h3>PA / SEI</h3>
            <p>{{ fila.Sei }}</p>
            <h3>Código da proposta</h3>
            <p>{{ fila.CodigoProposta }}</p>
          </li>
        </ul>

        <ul class="a4__report">
          <li class="report__item">
            <h3>Operação Urbana</h3>
            <p>{{ fila.SetorObj.OperacaoUrbana.Nome }}</p>
            <h3>Zona</h3>
            <p>{{ fila.Zona }}</p>
          </li>
          <li class="report__item">
            <h3>Setor</h3>
            <p>{{ fila.SetorObj.Nome }}</p>
            <h3>Uso</h3>
            <p>{{ fila.Uso }}</p>
          </li>
          <li v-if="isNotEmpty(fila.SubSetor)" class="report__item">
            <h3>Sub setor</h3>
            <p>{{ fila.SubSetor }}</p>
          </li>
        </ul>

        <ul class="a4__report one-column">
          <li v-if="isNotEmpty(fila.Certidao)" class="report__item">
            <h3>Certidão</h3>
            <p>{{ fila.Certidao }}</p>
          </li>
          <li class="report__item">
            <h3>Interessado</h3>
            <p>{{ fila.Interessado }}</p>
          </li>
          <li v-if="isNotEmpty(fila.Procurador)" class="report__item">
            <h3>Procurador</h3>
            <p>{{ fila.Procurador }}</p>
          </li>
          <li class="report__item">
            <h3>Endereço</h3>
            <p>{{ fila.Endereco }}</p>
          </li>
        </ul>
        <ul class="a4__report sqls">
          <h3>IPTU</h3>
          <li v-for="(sql, key) in sqls" :key="key" class="report__item">
            {{ sql.NumeroSql }}
          </li>
        </ul>
        <ul class="a4__report">
          <li v-if="isNotEmpty(fila.Licenciamento)" class="report__item">
            <h3>Licenciamento</h3>
            <p>{{ fila.Licenciamento }}</p>
          </li>
          <li v-if="isNotEmpty(fila.Zona)" class="report__item" />
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import axios from '~/plugins/axios'
import { fila as glossarioFila, statusDescription } from '~/static/data/glossario'
import PageTitle from '~/components/sections/PageTitle'
import LogoSpurb from '~/components/icons/LogoSpurb'

export default {
  name: 'IdOucfl',
  components: {
    PageTitle,
    LogoSpurb
  },
  data () {
    return {
      fila: {},
      sqls: [],
      glossarioFila,
      statusDescription
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
    // const filaClean = {}
    // const filaResponse = fila.data
    // for (const key in filaResponse) {
    //   if (filaResponse[key] !== null || typeof (filaResponse[key]) === 'number') {
    //     filaClean[key] = filaResponse[key]
    //   }
    // }
    return { fila: fila.data, sqls: sqls.data }
  },
  methods: {
    isNotEmpty (str) {
      switch (str) {
        case '': return false
        case '-': return false
        case null: return false
        default: return true
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~/assets/variables';

.main {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: 1fr;
  grid-column-gap: 16px;

  @media (max-width: $desktop) {
    display: block
  }
}

.a4 {
  grid-area: 1 / 4 / 2 / 10;
  margin-top: 3rem;
  margin-bottom: 3rem;
  height: calc((100vw / 12) * 6 * 1.41);
  background: #FFFFFF;
  border: 1px solid #EBE6E6;
  box-shadow: 4px 4px 8px rgba(125, 124, 124, 0.25);
  @media (max-width: $desktop) {
    border: 0;
    margin-top: 0;
    box-shadow: unset;
  }
}

.a4__report, .a4__header {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 1rem;
  margin-left: calc(100vw / 16);
  margin-right: calc(100vw / 16);
}

.a4__header {
  grid-template-rows: 1fr 1px;
  margin-top: calc(100vw / 36);
  margin-bottom: calc(100vw / 136);
  .logo {
    width: calc(100vw / 9.7);
    @media (max-width: $desktop) {
      display: none;
    }
  }
}

.a4__report {
  border-top: solid 1px #666666;
  padding-top: 1rem;
  margin-bottom: 1rem;
  .item__text--big {
    font-size: 1.5rem;
    @media (max-width: $tablet) { font-size: 1rem }
  }
  h3 { font-size: 12px }
  &.sqls {
    font-size: 12px;
    grid-template-columns: repeat(4, 1fr);
    h3 { grid-area: 1 / 1 / 2 / 5; }
    @media (max-width: $tablet) {
      grid-template-columns: repeat(3, 1fr);
      h3 { grid-area: 1 / 1 / 2 / 4; }
    }
  }
}

.one-column {
  grid-template-columns: 1fr;
}

.report__item {
  p { margin-bottom: 1rem }
}
</style>
