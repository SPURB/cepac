<template>
  <section class="indexTable">
    <preloader :is-fetching="isFetching" :error="error" />
    <div class="tabela">
      <filter-queries
        :location-path="locationPath"
        :build-filtros="buildFiltros"
      />
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
        <json-generator :json-doc-definition="rows" :file-name="tableName + '.json'" />
        <csv-generator :csv-doc-definition="csvDocDefinition" :file-name="tableName + '.csv'" />
        <pdf-generator :pdf-doc-definition="pdfDocDefinition" :file-name="tableName + '.pdf'" />
      </footer>
    </div>
  </section>
</template>

<script>
import { VueGoodTable } from 'vue-good-table'
import axios from '~/plugins/axios'
import Preloader from '~/components/sections/Preloader'
import FilterQueries from '~/components/elements/FilterQueries'
import CsvGenerator from '~/components/elements/CsvGenerator'
import PdfGenerator from '~/components/elements/PdfGenerator'
import JsonGenerator from '~/components/elements/JsonGenerator'
import { spurbanismoBase64 } from '~/assets/images/spurbanismoBase64'

export default {
  name: 'IndexTable',
  components: {
    VueGoodTable,
    Preloader,
    PdfGenerator,
    CsvGenerator,
    JsonGenerator,
    FilterQueries
  },
  props: {
    tableName: {
      required: true,
      type: String
    },
    queryFilter: {
      type: String,
      default: ''
    },
    buildFiltros: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      locationPath: '',
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
          field: 'Situacao',
          type: 'string'
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
          field: 'OperacaoUrbana',
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
      error: false
    }
  },
  computed: {
    csvDocDefinition () {
      if (this.rows.length === 0) { return [] }

      return this.rows.map((row) => {
        return {
          'Situação': row.Status.Nome,
          'Setor': row.Setor,
          'Data': row.Data,
          'N° Certidão': row.Certidao,
          'Empresa': row.Interessado,
          'Processo prefeitura': row.Sei,
          'Área Adicional Residencial (m²)': this.soma(row.AreaAdResidencial, 0),
          'Área Adicional Não Residencial (m²)': this.soma(row.AreaAdNaoResidencial, 0),
          'Área Adicional total (m²)': this.soma(row.AreaAdResidencial, row.AreaAdNaoResidencial),
          'CEPAC - Área adicional': this.soma(row.CepacAreaAdicional, 0),
          'CEPAC - Modificação de uso': this.soma(row.CepacModUso, 0),
          'CEPAC Total': this.soma(row.CepacAreaAdicional, row.CepacModUso)
        }
      })
    },
    idStatusQueries () { return this.$route.query.IdStatus },
    today () {
      return this.formatFmData(new Date().toISOString())
    },
    downloadTimeStamp () {
      const now = new Date()
      return `Página vistada em ${this.formatFmData(now.toISOString())} às ${now.getUTCHours()}h${now.getUTCMinutes()}`
    },
    lastUpdate () {
      if (!this.rows.length) return ''

      const parsedDated = dateStr => new Date(dateStr)

      const last = this.rows.reduce((accRow, currRow) => {
        if (parsedDated(accRow.DataAlteracao) > parsedDated(currRow.DataAlteracao)) return accRow
        else { return currRow }
      })

      return this.formatFmData(last.DataAlteracao)
    },
    pdfDocTypeDefinition () {
      const mapIdStatusTypes = {
        '1': "Processos em 'checklist' - ",
        '2': 'Estoque em análise - ',
        '3': 'Processos indeferidos - ',
        '4': 'Estoque consumido - ',
        '5': 'Processos cancelados - '
      }
      const type = mapIdStatusTypes[this.$route.query.IdStatus]
      return type || ''
    },
    pdfDocDefinition () {
      return {
        header: {
          columns: [
            {
              image: spurbanismoBase64,
              width: 75,
              margin: [ -249, 15 ],
              alignment: 'right'
            }
          ]
        },
        pageOrientation: 'landscape',
        pageSize: 'A4',
        info: {
          title: 'Resumo de Estoques da OUCFL',
          author: 'São Paulo Urbanismo',
          subject: 'Operação Urbana Consociada Faria Lima',
          keywords: 'ouc outorga cepac faria lima'
        },
        footer: (currentPage, pageCount) => {
          return {
            columns: [
              { text: this.downloadTimeStamp, margin: [ 40, 0, 0, 0 ], style: 'table' },
              { text: `Última atualização: ${this.lastUpdate}`, style: 'table', margin: [ 0, 0, 0, 0 ], alignment: 'center' },
              { link: window.location.href, text: `Fonte: ${window.location.hostname}${window.location.pathname}`, alignment: 'right', style: 'table', margin: [ 0, 0, 0, 0 ] },
              { text: `${currentPage}/${pageCount}`, alignment: 'right', style: 'table', margin: [ 0, 0, 40, 0 ] }
            ]
          }
        },
        content: this.pdfContent(this.rows),
        defaultStyle: {
          fontSize: 9
        },
        styles: {
          title: {
            fontSize: 14,
            bold: true
          },
          subtitle: {
            fontSize: 10,
            bold: true,
            margin: [ 0, 20, 0, 0 ]
          },
          table: {
            fontSize: 7,
            margin: [ 0, 5, 0, 0 ]
          }
        }
      }
    }
  },
  created () {
    const filters = this.fetchFilterString(this.$route.query, this.columns)
    filters ? this.fetchData(`/fila${filters}`) : this.fetchData(`/fila${this.queryFilter}`)
  },
  mounted () {
    this.locationPath = `${window.location.protocol}//${window.location.host}${window.location.pathname}` // /ouc-faria-lima
  },
  methods: {
    soma (a, b) {
      const nullToZero = nullPar => nullPar === null ? 0 : nullPar
      return parseFloat(nullToZero(a)) + parseFloat(nullToZero(b))
    },
    isQueryActive (queryKey, queryValue) {
      return parseInt(this.$route.query[queryKey]) === parseInt(queryValue)
    },
    pdfContent (rows) {
      if (!rows.length) return []

      else {
        const setores = rows.map(row => row.SetorObj)
        const uniqueSetoresIds = [...new Set(rows.map(row => row.SetorObj.Id))].sort()
        const uniqueSetoresObjects = uniqueSetoresIds.map(setorId => setores.find(setor => setor.Id === setorId))

        const rowsPerSetores = uniqueSetoresObjects
          .map((setor, index) => {
            const tableHeader = [
              [
                'Data',
                'Nº Certidão',
                'Empresa',
                'Processo Prefeitura',
                'Área Adicional Residencial (m²)',
                'Área Adicional Não Residencial (m²)',
                'Área adicional total (m²)',
                'CEPAC - Área adicional',
                'CEPAC - Modificação de uso',
                'CEPAC Total'
              ]
            ]

            const tableBody = rows
              .filter(row => row.SetorObj.Id === setor.Id)
              .map((row) => {
                return [
                  row.Data, // 'Data',
                  row.Certidao, // 'Nº Certidão',
                  row.Interessado, // 'Empresa',
                  row.Sei, // 'Processo Prefeitura',
                  row.AreaAdResidencial, // 'Área Adicional Residencial (m²)',
                  row.AreaAdNaoResidencial, // 'Área Adicional Não Residencial (m²)',
                  row.AreaTerreno, // 'Área adicional total (m²)',
                  row.CepacAreaAdicional, // 'CEPAC - Área adicional',
                  row.CepacModUso, // 'CEPAC - Modificação de uso',
                  this.soma(row.CepacAreaAdicional, row.CepacModUso)// 'CEPAC Total'
                ]
              })
            return [
              { text: `Setor ${setor.Nome}`, style: 'subtitle' },
              { text: `${this.pdfDocTypeDefinition}${this.today}`, style: 'table' },
              {
                table: {
                  headerRows: 1,
                  body: tableHeader.concat(tableBody)
                },
                style: 'table'
              },
              { text: '', setorindex: index, pageBreak: 'after' }
            ]
          })

        const content = [
          { text: 'OPERAÇÃO URBANA CONSORCIADA FARIA LIMA', style: 'title' }
        ]
        return content.concat(rowsPerSetores)
      }
    },
    onCellClick (params) {
      if (params.column.field === 'Id') {
        const id = params.row.Id
        this.$router.push({
          name: 'ouc-faria-lima-id',
          params: { id }
        })
      }
    },

    fetchData (path) {
      this.isFetching = true
      axios.get(path)
        .then((res) => {
          this.rows = this.parseRowItemObjects(res.data)
        })
        .catch((e) => { this.error = e })
        .finally(() => { this.isFetching = false })
    },
    parseRowItemObjects (responseArray) {
      return responseArray.map((item) => {
        item.Setor = item.SetorObj.Nome
        item.OperacaoUrbana = item.SetorObj.OperacaoUrbana.Nome
        item.Situacao = item.Status.Nome
        return item
      })
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
    reloadApp: () => window.location.reload(true),
    formatFmData (str) { return this.$options.filters.dateTimeStr(str) }
  }
}
</script>
<style lang="scss">
@import '~/assets/variables';

.indexTable {
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
        @media (max-width: $tablet) {
          display: none;
        }
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
        @media (max-width: $tablet) {
          padding-right: 1rem;
        }
      }
      .footer__navigation {
        order: 1;
        white-space: nowrap;
        box-sizing: border-box;
        color: #FFF;
        .footer__navigation__page-btn {
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
            @media (max-width: $tablet) {
              display: none
            }
          }
          &:last-child {
            margin-left: 0.5rem;
            @media (max-width: $tablet) {
              margin-left: 0.15rem;
            }
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
        &.vgt-pull-right {
          @media (max-width: $tablet) {
            display: flex;
            justify-content: space-between;
            width: 100%;
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
      @media (max-width: $tablet) {
        width: 100%;
        margin: 0 1rem 1rem 0;
      };
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
