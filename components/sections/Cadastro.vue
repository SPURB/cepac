<template>
  <div class="Cadastro main">
    <div class="a4">
      <div class="a4__header">
        <logo-spurb :fill-type="'#1D1D1B'" :fill-brand="'#038375'" />
      </div>
      <ul class="a4__report">
        <li class="report__item">
          <h3>{{ glossarioFila['Id'] }}</h3>
          <p>{{ fila.Id }}</p>
          <template v-if="isNotEmpty(fila.TipoPedido)">
            <h3>{{ glossarioFila['TipoPedido'] }}</h3>
            <p>{{ fila.TipoPedido }}</p>
          </template>
        </li>
        <li class="report__item">
          <h3>{{ glossarioFila['IdStatus'] }}</h3>
          <p class="item__text--big">
            {{ statusDescription[fila.IdStatus] }}
          </p>
        </li>
        <li class="report__item">
          <h3>{{ glossarioFila['Sei'] }}</h3>
          <p>{{ fila.Sei }}</p>
          <h3>{{ glossarioFila['CodigoProposta'] }}</h3>
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
          <h3>{{ glossarioFila['IdSetor'] }}</h3>
          <p>{{ fila.SetorObj.Nome }}</p>
          <h3>{{ glossarioFila['Uso'] }}</h3>
          <p>{{ fila.Uso }}</p>
        </li>
        <li v-if="isNotEmpty(fila.SubSetor)" class="report__item">
          <h3>{{ glossarioFila['SubSetor'] }}</h3>
          <p>{{ fila.SubSetor }}</p>
          <h3>{{ glossarioFila['AreaTerreno'] }}</h3>
          <p>{{ fila.AreaTerreno }}</p>
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
        <li v-if="isNotEmpty(fila.Licenciamento)" class="report__item">
          <h3>Licenciamento</h3>
          <p>{{ fila.Licenciamento }}</p>
        </li>
        <li v-if="isNotEmpty(fila.Zona)" class="report__item" />
      </ul>
      <ul class="a4__report four-columns">
        <li class="report__item">
          <h3>{{ glossarioFila['AreaAdResidencial'] }}</h3>
          <p class="item__text--small">
            {{ fila.AreaAdResidencial }}
          </p>
        </li>
        <li class="report__item">
          <h3>{{ glossarioFila['AreaAdNaoResidencial'] }}</h3>
          <p class="item__text--small">
            {{ fila.AreaAdNaoResidencial }}
          </p>
        </li>
        <li class="report__item">
          <h3>{{ glossarioFila['CepacAreaAdicional'] }}</h3>
          <p class="item__text--small">
            {{ fila.CepacAreaAdicional }}
          </p>
        </li>
        <li class="report__item">
          <h3>{{ glossarioFila['CAProjeto'] }}</h3>
          <p class="item__text--small">
            {{ fila.CAProjeto }}
          </p>
        </li>
      </ul>
      <ul class="a4__report four-columns">
        <h3>{{ pluralize('IPTU', fila.sqls.length > 1 ? true : false) }}</h3>
        <template v-if="sqls.length">
          <li v-for="(sql, key) in fila.sqls" :key="key" class="report__item">
            <p class="item__text--small">
              {{ sql.NumeroSql }}
            </p>
          </li>
        </template>
        <p v-else class="item__text--small four-column--exception">
          Nenhum SQL está associado a este cadastro
        </p>
      </ul>
      <ul class="a4__report two-columns">
        <li v-if="isNotEmpty(fila.Data)" class="report__item">
          <h3>{{ glossarioFila['Data'] }}</h3>
          <p class="item__text--small">
            {{ fila.Data.replace('T', ' ') }}
          </p>
        </li>
        <li v-if="isNotEmpty(fila.DataAlteracao)" class="report__item">
          <h3>{{ glossarioFila['DataAlteracao'] }}</h3>
          <p class="item__text--small">
            {{ fila.DataAlteracao.replace('T', ' ') }}
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { fila as glossarioFila, statusDescription } from '~/static/data/glossario'
import LogoSpurb from '~/components/icons/LogoSpurb'
import { helpers } from '~/mixins/helpers'

export default {
  name: 'Cadastro',
  components: {
    LogoSpurb
  },
  mixins: [ helpers ],
  props: {
    fila: {
      type: Object,
      required: true
    },
    sqls: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      glossarioFila,
      statusDescription
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~/assets/variables';

.main {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: 2fr;
  grid-column-gap: 16px;
  footer {
    grid-area: 2 / 1 / 3 / 13;
  }
  @media (max-width: $desktop) {
    display: block;
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

  @media (max-width: $hd){
    height: unset;
    padding-bottom: 2rem;
  }

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
  margin-bottom: 0.5rem;
  padding-top: 0.5rem;
  border-top: solid 1px #666666;
  .item__text--big {
    font-size: 1.5rem;
    @media (max-width: $tablet) { font-size: 1rem }
  }
  .item__text--small { font-size: 12px }
  h3 { font-size: 12px }
  &.one-column {
    grid-template-columns: 1fr;
  }
  &.two-columns {
    grid-template-columns: 1fr 1fr;
    li:last-child{
      grid-area: 1 / 2 / 2 / 3;
      text-align: right
    }
  }
  &.four-columns {
    grid-template-columns: repeat(4, 1fr);
    h3 { grid-area: 1 / 1 / 2 / 5; }
    @media (max-width: $tablet) {
      grid-template-columns: repeat(3, 1fr);
      h3 { grid-area: 1 / 1 / 2 / 4; }
    }
  }
  .four-column--exception {
    grid-area: 1 / 2 / 2 / 5
  }
}

.report__item {
  p { margin-bottom: 0.35rem }
}
</style>
