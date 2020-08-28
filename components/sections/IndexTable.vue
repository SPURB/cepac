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
        <csv-generator :csv-doc-definition="csvDocDefinition" :file-name="tableName + '.xlsx'" />
        <pdf-generator :pdf-doc-definition="pdfDocDefinition" :file-name="tableName + '.pdf'" />
      </footer>
    </div>
  </section>
</template>

<script>
import { VueGoodTable } from 'vue-good-table'
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
          label: 'Tipo de pedido',
          field: 'TipoPedido',
          type: 'string',
          globalSearchDisabled: true
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
          'id': row.Id,
          'TipoPedido': row.TipoPedido,
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
            fontSize: 6,
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
                'Tipo de pedido',
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
                  row.TipoPedido,
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
      this.$cepacs.get(path)
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
