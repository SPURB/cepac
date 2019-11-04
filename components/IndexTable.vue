<template>
  <div class="indexTable">
    <div v-if="isFetching" class="preloader">
      <h2>carregando...</h2>
    </div>
    <div v-if="displayError" class="error">
      <h3>{{ error }}</h3>
      <button @click="reloadApp">
        Tentar novamente
      </button>
    </div>
    <div v-else>
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
      />
      <div class="actions">
        <button @click.prevent="saveTable(`${tableName}.json`, rows)">
          Salvar json
        </button>
        <button @click.prevent="saveTable(`${tableName}.csv`, rows)">
          Salvar csv
        </button>
      </div>
    </div>
  </div>
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
          type: 'number'
        },
        {
          label: 'E-mail',
          field: 'Email',
          type: 'string'
        },
        {
          label: 'Telefone',
          field: 'Telefone',
          type: 'string'
        },
        {
          label: 'Data de criação',
          field: 'Data',
          type: 'string',
          formatFn: this.formatFmData
        },
        {
          label: 'SEI',
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
          field: 'Operacao Urbana',
          type: 'string'
        },
        {
          label: 'Setor',
          field: 'Setor',
          type: 'string'
        },
        {
          label: 'Subsetor',
          field: 'SubSetor',
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
          label: 'CEPAC - Objeto',
          field: 'CepacObjeto',
          type: 'string'
        },
        {
          label: 'CEPAC - Área adicional',
          field: 'CEPAC Área Adicional',
          type: 'number'
        },
        {
          label: 'CEPAC - Modo de uso',
          field: 'CepacModUso',
          type: 'number'
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
    filters ? this.fetchData(`/fila${filters}`) : this.fetchData('/fila')
  },
  methods: {
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
    formatStatus (statusObj) { return statusObj.Nome },
    formatFmData (str) { return str.replace('T', ', ') }
  }
}
</script>
<style lang="scss">
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
    background-color: inherit;
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
    tbody:hover td { color: #BDBDBD; }
    tr:hover td {
      color: initial;
    }
    thead tr th:first-child:not([colspan]), tbody tr td:first-child:not([colspan]) {
      position: absolute;
      left: 0;
      width: 3.25rem !important;
      text-align: center;
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
      span:after {
        content: '↓';
        color: #AAA;
        font-size: 0.75rem;
        vertical-align: 2px;
        font-weight: normal;
        margin-left: 0.125rem;
      }
      &.sorting {
        span:after {
          color: #000;
        }
        &.sorting-desc {
          span:after {
            content: '↑';
          }
        }
      }
    }
    tbody tr:nth-child(2n) td { background: #F5F5F5; }
    th, td {
      white-space: nowrap;
      padding: 0.75rem 1rem;
      transition: all ease-in-out .1s;
      span {
        display: block;
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
</style>
