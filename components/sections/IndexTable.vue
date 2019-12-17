<template>
  <section class="indexTable">
    <div :class="{ faded: !isFetching }" class="preloader">
      <h2>carregando...</h2>
    </div>
    <div v-if="displayError" class="error">
      <h3>{{ error }}</h3>
      <button @click="reloadApp">
        Tentar novamente
      </button>
    </div>
    <div v-else class="tabela">
      <vue-good-table
        :columns="columns"
        :rows="rows"
        :search-options="{
          enabled: true,
          placeholder: 'Procure por qualquer valor ou clique no rótulo para ordenar',
        }"
        :sort-options="{
          enabled: true,
          initialSortBy: [
            { field: 'Id', type: 'asc' },
            { field: 'Data', type: 'asc' }
          ]
        }"
        :pagination-options="{
          enabled: true,
          mode: 'records',
          nextLabel: 'Próximo',
          prevLabel: 'Anterior',
          rowsPerPageLabel: 'Mostrar',
          ofLabel: 'de',
          allLabel: 'Todos'
        }"
        @on-cell-click="onCellClick"
      />
      <footer class="actions">
        <button @click.prevent="saveTable(addDateToFileName(tableName + '.json'), rows)">
          <span style="font-size: 0.8rem">{ }</span>
          Salvar como .json
        </button>
        <button @click.prevent="saveTable(addDateToFileName(tableName + '.csv'), rows)">
          <span style="font-size: 0.8rem">&boxplus;</span>
          Salvar como .csv
        </button>
      </footer>
    </div>
  </section>
</template>

<script>
import { VueGoodTable } from 'vue-good-table'
import FileSaver from 'file-saver'
import axios from '~/plugins/axios'

export default {
  name: 'Index',
  components: {
    VueGoodTable
  },
  props: {
    tableName: {
      required: true,
      type: String
    },
    queryFilter: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      columns: [
        {
          label: 'ID',
          field: 'Id',
          type: 'number'
        },
        {
          label: 'Interessado',
          field: 'Interessado',
          type: 'string'
        },
        {
          label: 'Situação',
          field: 'Status',
          type: 'string',
          formatFn: this.formatStatus,
          sortable: false
        },
        {
          label: 'Id Status',
          field: 'IdStatus',
          type: 'number',
          hidden: true
        },
        {
          label: 'Id Setor',
          field: 'IdSetor',
          type: 'number',
          hidden: true
        },
        {
          label: 'Data de criação',
          field: 'Data',
          type: 'string',
          formatFn: this.formatFmData
        },
        {
          label: 'PA/SEI',
          field: 'Sei',
          type: 'string'
        },
        {
          label: 'Certidão',
          field: 'Certidao',
          type: 'string'
        },
        {
          label: 'Licenciamento',
          field: 'Licenciamento',
          type: 'string'
        },
        {
          label: 'Operacão Urbana',
          field: 'SetorObj',
          type: 'string',
          formatFn: this.formatOperacaoUrbana
        },
        {
          label: 'Setor',
          field: 'SetorObj',
          type: 'string',
          formatFn: this.formatSetor
        },
        {
          label: 'Subsetor',
          field: 'SubSetor',
          type: 'string'
        },
        {
          label: 'Endereço',
          field: 'Endereco',
          type: 'string'
        },
        {
          label: 'Área do Terreno',
          field: 'AreaTerreno',
          type: 'string'
        },
        {
          label: 'Zona',
          field: 'Zona',
          type: 'string'
        },
        {
          label: 'Uso',
          field: 'Uso',
          type: 'string'
        },
        {
          label: 'C.A. do Projeto',
          field: 'CAProjeto',
          type: 'string'
        },
        {
          label: 'Área adicional (residencial)',
          field: 'AreaAdResidencial',
          type: 'number'
        },
        {
          label: 'Área adicional (não residencial)',
          field: 'AreaAdNaoResidencial',
          type: 'number'
        },
        {
          label: 'CEPAC - Área adicional',
          field: 'CepacAreaAdicional',
          type: 'number'
        },
        {
          label: 'CEPAC - Parâmetros',
          field: 'CepacModUso',
          type: 'number'
        },
        {
          label: 'Código da Proposta',
          field: 'CodigoProposta',
          type: 'String'
        },
        {
          label: 'Observações',
          field: 'Obs',
          type: 'String'
        }
      ],
      isFetching: false,
      status: [],
      rows: [],
      error: ''
    }
  },
  computed: {
    displayError () { return this.error !== '' }
  },
  created () {
    const filters = this.fetchFilterString(this.$route.query, this.columns)
    filters ? this.fetchData(`/fila${filters}`) : this.fetchData(`/fila${this.queryFilter}`)
  },
  methods: {
    addDateToFileName (name) {
      const nameSplit = name.split('.') // ['name', 'extension']
      const d = new Date()
      const dateStr = `${d.getFullYear()}-${d.getMonth()}-${d.getDay()}_${d.getHours()}h${d.getMinutes()}`
      nameSplit.splice(nameSplit.length - 1, 0, dateStr)
      return nameSplit.join('.')
    },
    onCellClick (params) {
      if (params.column.field === 'Id') {
        const id = params.row.Id
        this.$router.push({ path: `${this.$route.path}/${id}` })
      }
    },
    saveTable (name, content) {
      const nameSplit = name.split('.')
      const type = nameSplit[nameSplit.length - 1] // 'json' ou 'csv'

      if (type === 'json') {
        const jsonBlob = new Blob([JSON.stringify(content)], { type: 'text/json; charset=utf-8' })
        FileSaver.saveAs(jsonBlob, name)
      }

      else if (type === 'csv') {
        const csvBlob = new Blob([this.convertToCSV(content)], { type: 'text/csv; charset=utf-8' })
        FileSaver.saveAs(csvBlob, name)
      }

      else { throw new Error(`${type} não é um formato válido para conversão`) }
    },

    convertToCSV (objArray) {
      const array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray
      let str = `${Object.keys(objArray[0]).join(',')}\r\n` // header vem do primeiro objeto

      array.forEach((obj) => {
        let line = ''
        for (const key in obj) {
          if (line !== '') { line += ',' }
          line += obj[key]
        }
        str += `${line}\r\n`
      })

      return str
    },

    fetchData (path) {
      this.isFetching = true
      axios.get(path)
        .then((res) => {
          const resIsArray = Object.prototype.toString.call(res.data) === '[object Array]'
          if (resIsArray) { this.rows = res.data }
          else {
            this.rows.push(res.data)
          }
        })
        .catch((e) => { this.error = 'Erro' })
        .finally(() => { this.isFetching = false })
    },

    fetchFilterString (queries, columns) {
      if (Object.keys(queries).length === 0) { return false } // no queries

      const filters = []

      const isValidQuery = (queryKey, columns) => {
        return columns
          .map(column => column.field)
          .includes(queryKey)
      }

      for (const key in queries) {
        if (isValidQuery(key, columns)) {
          const concat = `${key}=${queries[key]}`
          filters.push(concat)
        }
        else { console.error(key) }
      }

      if (filters.length) {
        return `?${filters.join('&')}`// algo como -> ?Id=1&SubSetor=99
      }
      else { return false }
    },
    reloadApp () { window.location.reload(true) },
    formatSetor (setorObj) { return setorObj.Nome },
    formatOperacaoUrbana (setorObj) { return setorObj.OperacaoUrbana.Nome },
    formatStatus (statusObj) { return statusObj.Nome },
    formatFmData (str) { return this.$options.filters.dateTimeStr(str) }
  }
}
</script>
<style lang="scss">
.indexTable {
  .preloader {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    max-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2;
    background-color: #008375;
    color: #FFF;
    transition: all ease-in 0.25s 0.15s;
    h2 {
      font-size: 1rem;
      font-weight: normal;
      text-shadow: 0 2px 4px rgba(0, 0, 0, .36);
      transition: all ease-out .4s;
      user-select: none;
    }
    &.faded {
      opacity: 0.5;
      max-height: 0;
      h2 {
        opacity: 0;
      }
    }
  }
  .error {
    padding: 2rem 3.25rem;
    h2 {
      color: #EB5757;
      font-size: 1.5rem;
    }
    p {
      font-size: small;
      color: #BDBDBD;
    }
    button {
      margin: 2rem 0 0;
      padding: 1.5rem 1.75rem 1.6rem;
      background-color: #005249;
      border: 2px solid rgba(255, 255, 255, .2);
      border-radius: 0.25rem;
      font-family: inherit;
      font-size: 1rem;
      color: #FFF;
      text-shadow: 0 1px 2px rgba(0, 0, 0, .36);
      cursor: pointer;
      transition: all ease-out .1s;
      span {
        font-size: 1.25rem;
        line-height: 1.6rem;
      }
      &:hover {
        background-color: #008375;
      }
    }
  }
  div.tabela {
    .vgt-global-search {
      padding: 2rem 3.25rem;
      background-color: #005249;
      z-index: 1;
      &::before {
        content: '⌕';
        font-size: 1.5rem;
        position: absolute;
        line-height: 1.75rem;
        color: #FFF;
      }
      input {
        font-family: inherit;
        font-size: 1rem;
        width: 100%;
        padding: 0 0 0.5rem 1.5rem;
        border: none;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        background-color: transparent;
        color: #FFF;
        transition: border ease-in .2s;
        &:focus { border-bottom-color: #FFF; }
        &::-webkit-input-placeholder { opacity: 1; }
        &::-moz-placeholder { opacity: 1; }
        &:-moz-placeholder { opacity: 1; }
        &:-ms-input-placeholder { opacity: 1; }
      }
    }
    .vgt-responsive {
      width: calc(100% - 3.25rem);
      overflow-x: scroll;
      overflow-y: visible;
      margin-left: 3.25rem;
      table {
        border-collapse: separate;
        border-spacing: 0;
        @media (min-width: 1200px) {
          tbody:hover td { color: #BDBDBD; }
          tr:hover td {
            color: initial;
          }
        }
        thead tr th:first-child:not([colspan]), tbody tr td:first-child:not([colspan]) {
          position: absolute;
          left: 0;
          width: 3.25rem !important;
          text-align: center;
        }
        tbody tr td:first-child:not([colspan]) {
          padding: 0.5rem;
          span {
            position: relative;
            display: block;
            width: 100%;
            height: 100%;
            padding: calc(0.25rem - 2px) calc(0.5rem - 2px);
            background-color: #005249;
            border-radius: 2rem;
            border: 2px solid rgba(255, 255, 255, .2);
            color: #FFF;
            cursor: pointer;
            box-shadow: 0 2px 4px rgba(0, 0, 0, .48);
            line-height: calc(16px * 1.6);
            font-size: 0.7rem;
            text-shadow: 0 1px 2px rgba(0, 0, 0, .48);
            transition: all ease-out .1s;
            &::after {
              position: absolute;
              width: 100%;
              left: 0;
              top: calc(50% - 2px);
              transform: translateY(-50%) scale(0.75, 1.25);
              content: '→';
              letter-spacing: -13px;
              opacity: 0;
              font-size: 1.25rem;
              transition: all ease-out .2s;
            }
            &:hover {
              background-color: #008375;
              color: transparent;
              text-shadow: none;
              &::after {
                letter-spacing: 0;
                opacity: 1;
                color: #FFF;
              }
            }
          }
        }
        thead tr th:nth-child(2):not([colspan]), tbody tr td:nth-child(2):not([colspan]) {
          padding-left: 0;
        }
        thead tr th:last-child:not([colspan]), tbody tr td:last-child:not([colspan]) {
          padding-right: 3.25rem;
        }
        thead tr th {
          background-color: #D5D5D5;
          text-align: left;
          user-select: none;
          -moz-user-select: none;
          &:hover {
            cursor: pointer;
          }
          span::after {
            content: '↓';
            color: transparent;
            font-size: 0;
            vertical-align: 2px;
            font-weight: normal;
            margin-left: 0;
            transition: all ease-out .2s;
          }
          &.sorting {
            span::after {
              color: #000;
              font-size: 0.75rem;
              margin-left: 0.125rem;
            }
            &.sorting-desc {
              span::after {
                content: '↑';
              }
            }
          }
        }
        tbody tr:nth-child(2n) td { background: #F5F5F5; }
        tbody tr td:last-child span {
          display: block;
          max-width: 500px;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        th, td {
          white-space: nowrap;
          padding: 0 1rem;
          transition: all ease-in-out .1s;
          span {
            display: inline-block;
            padding: 0.75rem 0;
          }
          &[colspan] {
            padding: 1rem 0;
            @keyframes slideup {
              0% {
                transform: translateY(2rem) translateX(-50%);
                opacity: 0;
              }
              10% {
                transform: translateY(0rem) translateX(-50%);
                opacity: 1;
              }
              80% {
                transform: translateY(0rem) translateX(-50%);
                opacity: 1;
              }
              100% {
                transform: translateY(2rem) translateX(-50%);
                opacity: 0;
              }
            }
            div {
              position: absolute;
              bottom: 2rem;
              left: 50%;
              transform: translateY(2rem) translateX(-50%);
              padding: 1rem 1.5rem 1rem 1rem;
              color: #FFF;
              font-size: 1.5rem;
              text-align: center;
              display: inline-block;
              background-color: #008375;
              border-radius: 0.5rem;
              opacity: 0;
              animation: slideup ease-in-out 4s;
              &:before {
                content: '⊘';
              }
            }
          }
        }
      }
    }
    .vgt-wrap__footer {
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      align-items: center;
      padding: 2rem 3.25rem 0;
      background-color: #005249;
      .footer__row-count {
        line-height: 1.2;
        padding: 1rem 1.25rem;
        background-color: rgba(255, 255, 255, .04);
        border-radius: 0.25rem;
        color: #FFF;
        order: 2;
        select {
          font-family: inherit;
          font-size: inherit;
          color: #005249;
          border: 0;
          background-color: #FFF;
          margin-left: 0.75rem;
        }
      }
      .footer__navigation {
        order: 1;
        white-space: nowrap;
        box-sizing: border-box;
        color: #FFF;
        a.footer__navigation__page-btn {
          display: inline-block;
          padding: 1rem 1.25rem;
          background-color: rgba(255, 255, 255, .04);
          border-radius: 0.25rem;
          text-decoration: none;
          text-align: center;
          transition: all ease-out .1s;
          color: inherit;
          font-size: 1rem;
          line-height: 1.2;
          user-select: none;
          -moz-user-select: none;
          &:first-child {
            margin-right: 0.5rem;
          }
          &:last-child {
            margin-left: 0.5rem;
          }
          &:hover {
            background-color: #008375;
          }
          &.disabled {
            background-color: transparent;
            color: transparent;
            max-width: 0;
            cursor: default;
            padding: 0;
            margin: 0;
          }
        }
        .footer__navigation__info {
          display: inline-block;
          background-color: rgba(0, 0, 0, .08);
          padding: 1rem 1.25rem;
          line-height: 1.2;
          border-radius: 0.25rem;
        }
      }
    }
  }
  footer {
    background-color: #005249;
    padding: 2rem 3.25rem 0;
    button {
      margin: 0 2rem 2rem 0;
      &:last-child {
        margin-right: 0;
      }
      border: 0;
      padding: 1rem 1.25rem;
      background-color: rgba(255, 255, 255, .04);
      border-radius: 0.25rem;
      font-family: inherit;
      color: #FFF;
      font-size: initial;
      cursor: pointer;
      transition: all ease-out .2s;
      &:hover {
        background-color: #008375;
      }
      span {
        display: inline-block;
        width: 1.2rem;
        line-height: 1.2rem;
        border-radius: 1.2rem;
        background-color: rgba(255, 255, 255, .2);
        margin: 0 0.25rem 0 0;
      }
    }
  }
  span.tip {
    position: absolute;
    font-size: small;
    line-height: 1;
    padding: 0.25rem 0.3rem;
    background-color: #FFF;
    border: 1px solid #DDD;
    opacity: 0;
    user-select: none;
    -moz-user-select: none;
    z-index: -1;
    @keyframes displayTip {
      0% {
        opacity: 0;
        z-index: -1;
      }
      10% {
        opacity: 1;
        z-index: 2;
      }
      90% {
        opacity: 1;
        z-index: 2;
      }
      100% {
        opacity: 0;
        z-index: -1;
      }
    }
    animation: displayTip ease-in-out 2s;
  }
}
</style>
