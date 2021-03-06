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
    <footer-actions
      :pdf-doc-definition="pdfDocDefinition"
      :csv-doc-definition="docDefinition"
      :file-name="fileName"
      :json-doc-definition="docDefinition"
      :geojson-doc-definition="geoDefinition"
      :go-back-path="'/ouc-faria-lima'"
      :go-forward="{ path:'/ouc-faria-lima/resumo', text:'Resumo de estoques' }"
      :which-show="[1, 2, 3, 5]"
    />
  </div>
</template>
<script>
import PageTitle from '~/components/sections/PageTitle'
import Cadastro from '~/components/sections/Cadastro'
import FooterActions from '~/components/sections/FooterActions'
import { helpers } from '~/mixins/helpers'
import { spurbanismoBase64 } from '~/assets/images/spurbanismoBase64'
import { fila as glossarioFila } from '~/static/data/glossario'
const svgLine = '<svg width="475" height="1" viewBox="0 0 475 1" fill="none" ><line y1="0.5" x2="475" y2="0.5" stroke="#666666"/></svg>'

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
      outputFila: {},
      pdfDocDefinition: {},
      docDefinition: [],
      geoDefinition: {}
    }
  },
  computed: {
    fileName () {
      const d = new Date()
      return `${this.$route.name}-${this.$route.params.id}_${d.getFullYear()}-${d.getMonth()}-${d.getDay()}_${d.getHours()}h${d.getMinutes()}`
    },
    filaItemUrl () {
      return `Dados referentes ao cadastro ${this.$route.params.id}`
    },
    sqlsItemUrl () {
      const haveSql = this.sqls.length > 1
      return `${this.pluralize('IPTU', haveSql)} ${this.pluralize('associado', haveSql)} ao cadastro ${this.$route.params.id}`
    }
  },
  async asyncData ({ params, $cepacs, $geo }) {
    const fila = await $cepacs.get(`fila/${params.id}`)
    const sqls = await $cepacs.get(`sqls?IdFilaCepac=${params.id}`)
    let geojson = {}
    try {
      geojson = await $geo.get(`geo/${fila.data.IdGeo}`)
    }
    catch (err) {
      geojson.data = {}
    }
    return { fila: fila.data, sqls: sqls.data, geoDefinition: geojson.data }
  },
  created () {
    const outputFila = this.fila
    outputFila.sqls = this.sqls

    this.docDefinition.push(outputFila)

    this.pdfDocDefinition = this.setPdfDocDefinition(this.fila)
  },
  methods: {
    setPdfDocDefinition (fila) {
      const emptyRemoved = keys => keys.filter(key => this.isNotEmpty(fila[key]))

      return {
        header: {
          columns: [
            {
              image: spurbanismoBase64,
              width: 100,
              margin: [ -20, 40 ],
              alignment: 'right'
            }
          ]
        },
        pageSize: 'A4',
        info: {
          title: `Resumo de Estoques - ${fila.SetorObj.OperacaoUrbana.Nome}`,
          author: 'São Paulo Urbanismo',
          subject: `${fila.SetorObj.OperacaoUrbana.Nome}`,
          keywords: `ouc outorga cepac ${fila.SetorObj.OperacaoUrbana.Nome}`
        },
        footer: {
          columns: [
            { text: `Data de cadastro\n${this.$options.filters.dateTimeStr(fila.Data)}`, margin: [ 60, 0 ], style: 'content' },
            { text: `Última atualização\n${this.$options.filters.dateTimeStr(fila.DataAlteracao)}`, margin: [ 60, 0 ], style: 'content', alignment: 'right' }
          ]
        },

        content: [
          { margin: [ 20, 40, 0, 0 ], svg: svgLine },
          {
            margin: [ 20, 10, 0, 0 ],
            columns: [
              {
                text: 'Cadastro'
              },
              {
                text: 'Situação'
              },
              {
                text: 'PA - SEI'
              }
            ]
          },
          {
            margin: [ 20, 0, 0, 0 ],
            columns: [
              {
                text: fila.Id,
                style: 'bigger'
              },
              {
                text: fila.Status.Nome,
                style: 'bigger'
              },
              {
                text: `${fila.Sei}\n\nCódigo da proposta\n${fila.CodigoProposta}`,
                style: 'content'
              }
            ]
          },
          { margin: [ 20, 15, 0, 0 ], svg: svgLine },
          {
            margin: [ 20, 10, 0, 0 ],
            columns: [
              {
                text: `Operação Urbana\n${fila.SetorObj.OperacaoUrbana.Nome}\n\n Zona \n${fila.Zona}`,
                style: 'content'
              },
              {
                text: `Setor \n${fila.SetorObj.Nome}\n\n Tipo de uso\n${fila.Uso}`,
                style: 'content'
              },
              {
                text: `Sub setor \n${fila.SubSetor}`,
                style: 'content'
              }
            ]
          },
          {
            margin: [ 20, 15, 0, 0 ],
            svg: svgLine },
          {
            margin: [ 20, 15, 0, 0 ],
            style: 'content',
            text: `Certidão\n${fila.Certidao}\n\nInteressado\n${fila.Interessado}\n\nEndereço\n${fila.Endereco}`
          },
          {
            margin: [ 20, 15, 0, 0 ],
            svg: svgLine
          },
          {
            margin: [ 20, 10, 0, 0 ],
            columns: emptyRemoved(['AreaAdResidencial', 'AreaAdNaoResidencial', 'CepacAreaAdicional', 'CAProjeto'])
              .map((key) => {
                return {
                  text: `${glossarioFila[key]}\n${fila[key]}`,
                  style: 'content'
                }
              })
          },
          {
            margin: [ 20, 15, 0, 0 ],
            svg: svgLine
          },
          {
            margin: [ 20, 10, 0, 0 ],
            text: `IPTU \n ${fila.sqls.map(sql => sql.NumeroSql).join(' | ')}`
          },
          {
            margin: [ 20, 15, 0, 0 ],
            svg: svgLine
          }
        ],
        defaultStyle: {
          fontSize: 9,
          lineHeight: 1.7,
          columnGap: 7
        },
        styles: {
          content: { lineHeight: 1.2 },
          bigger: { fontSize: 16 },
          big: { fontSize: 11 },
          left: { alignment: 'left' }
        }
      }
    }
  }
}
</script>
