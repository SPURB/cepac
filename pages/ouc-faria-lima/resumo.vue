<template>
  <div class="estoque-aca main--content">
    <page-title :two-columns="true">
      <div class="col-1">
        <h1>Operação Urbana Consorciada Faria Lima</h1>
        <h2>Lei 13.769/04, alterada pelas leis 13.871/04, 15.519/11 e 16.242/15</h2>
      </div>
      <div class="col-2">
        <p>Fontes:</p>
        <ul>
          <li class="fonte">
            <a href="https://servicos.spurbanismo.sp.gov.br/cepacs/api/estoque/">Dados resumidos de estoque</a>
          </li>
          <li class="fonte">
            <a href="https://spurb.github.io/relatorios/data/estoques.json">Dados gerais da OUCFL</a>
          </li>
        </ul>
      </div>
    </page-title>

    <preloader :is-fetching="isFetching" :error="error" />

    <section :class="{ isFetching }" class="tabelas">
      <table class="tabela-aca block">
        <tr>
          <td class="tabela-aca__title" colspan="11">
            <h3>Controle de Estoques de Área de Construção Adicional (ACA)</h3>
          </td>
        </tr>
        <tr class="tabela-aca__header">
          <td rowspan="2">
            Setores
          </td>
          <td colspan="2">
            Estoque máximo(m²) previsto para setores
          </td>
          <td colspan="2">
            Estoque consumido (m²)
          </td>
          <td colspan="2">
            Estoque em análise (m²)
          </td>
          <td colspan="2">
            Saldo de estoque máximo (m²) previsto para setores
          </td>
          <td colspan="2">
            Saldo estoque geral disponível para operação urbana (*)
          </td>
        </tr>
        <tr class="r-nr">
          <td>Residencial</td>
          <td>Não residencial</td>
          <td>Residencial</td>
          <td>Não residencial</td>
          <td>Residencial</td>
          <td>Não residencial</td>
          <td>Residencial</td>
          <td>Não residencial</td>
          <td>Residencial</td>
          <td>Não residencial</td>
        </tr>
        <tr class="conteudo">
          <td class="title">
            <router-link
              :to="{
                path: '/ouc-faria-lima',
                query: { IdSetor: 1, IdStatus: 4 }}"
              tag="a"
            >
              Hélio pelegrino
            </router-link>
          </td>
          <td>
            <router-link
              :to="{
                path: '/ouc-faria-lima',
                query: { IdSetor: 3, IdStatus: 4 }}"
              tag="a"
            >
              {{ lei.helioPelegrino.areaMax.res | formatNumber }}
            </router-link>
          </td>
          <td>{{ lei.helioPelegrino.areaMax.nRes | formatNumber }}</td>
          <td>{{ helioPelegrino[4].AreaAdicionalR | formatNumber }}</td>
          <td>{{ helioPelegrino[4].AreaAdicionalNR | formatNumber }}</td>
          <td>{{ helioPelegrino[2].AreaAdicionalR | formatNumber }}</td>
          <td>{{ helioPelegrino[2].AreaAdicionalNR | formatNumber }}</td>
          <td>{{ saldos.helioPelegrino.residencial | formatNumber }}</td>
          <td>{{ saldos.helioPelegrino.nR | formatNumber }}</td>
          <td colspan="2" rowspan="4" class="destaque">
            {{ saldoTotal | formatNumber }}
          </td>
        </tr>
        <tr class="conteudo">
          <td class="title">
            <router-link
              :to="{
                path: '/ouc-faria-lima',
                query: { IdSetor: 2, IdStatus: 4 }}"
              tag="a"
            >
              Faria Lima
            </router-link>
          </td>
          <td>{{ lei.fariaLima.areaMax.res | formatNumber }}</td>
          <td>{{ lei.fariaLima.areaMax.nRes | formatNumber }}</td>
          <td>{{ fariaLima[4].AreaAdicionalR | formatNumber }}</td>
          <td>{{ fariaLima[4].AreaAdicionalNR | formatNumber }}</td>
          <td>{{ fariaLima[2].AreaAdicionalR | formatNumber }}</td>
          <td>{{ fariaLima[2].AreaAdicionalNR | formatNumber }}</td>
          <td>{{ saldos.fariaLima.residencial | formatNumber }}</td>
          <td>{{ saldos.fariaLima.nR | formatNumber }}</td>
        </tr>
        <tr class="conteudo">
          <td class="title">
            <router-link
              :to="{
                path: '/ouc-faria-lima',
                query: { IdSetor: 3, IdStatus: 4 }}"
              tag="a"
            >
              Pinheiros
            </router-link>
          </td>
          <td>{{ lei.pinheiros.areaMax.res | formatNumber }}</td>
          <td>{{ lei.pinheiros.areaMax.nRes | formatNumber }}</td>
          <td>{{ pinheiros[4].AreaAdicionalR | formatNumber }}</td>
          <td>{{ pinheiros[4].AreaAdicionalNR | formatNumber }}</td>
          <td>{{ pinheiros[2].AreaAdicionalR | formatNumber }}</td>
          <td>{{ pinheiros[2].AreaAdicionalNR | formatNumber }}</td>
          <td>{{ saldos.pinheiros.residencial | formatNumber }}</td>
          <td>{{ saldos.pinheiros.nR | formatNumber }}</td>
        </tr>
        <tr class="conteudo last">
          <td class="title">
            <router-link
              :to="{
                path: '/ouc-faria-lima',
                query: { IdSetor: 4, IdStatus: 4 }}"
              tag="a"
            >
              Olimpíadas
            </router-link>
          </td>
          <td>{{ lei.olimpiadas.areaMax.res | formatNumber }}</td>
          <td>{{ lei.olimpiadas.areaMax.nRes | formatNumber }}</td>
          <td>{{ olimpiadas[4].AreaAdicionalR | formatNumber }}</td>
          <td>{{ olimpiadas[4].AreaAdicionalNR | formatNumber }}</td>
          <td>{{ olimpiadas[2].AreaAdicionalR | formatNumber }}</td>
          <td>{{ olimpiadas[2].AreaAdicionalNR | formatNumber }}</td>
          <td>{{ saldos.olimpiadas.residencial | formatNumber }}</td>
          <td>{{ saldos.olimpiadas.nR | formatNumber }}</td>
        </tr>
        <tfoot>
          <tr class="notas">
            <td colspan="11" class="nota">
              (*) Saldo com base no limite de estoque líquido disponibilizado pelo Artigo 6º e Tabela 2 da Lei 13.769/04
            </td>
          </tr>
        </tfoot>
      </table>

      <div class="tabelas-container">
        <table class="tabelas__limite block">
          <tr>
            <td colspan="2" class="title">
              Limite de estoque para efeito de oferta de CEPAC
            </td>
          </tr>
          <tr>
            <td>Estoque GERAL (aprovado pela 11.732/95)</td>
            <td class="dado">
              {{ lei.estoqueGeral | formatNumber }}
            </td>
          </tr>
          <tr>
            <td>Estoque cosumido lei 11.732/95</td>
            <td class="dado">
              {{ lei.leiAntiga["consumidoPre-1376904"] | formatNumber }}
            </td>
          </tr>
          <tr>
            <td> LIMITE DE ESTOQUE - Leis 13.769/04 e 13.871/04 (**)</td>
            <td class="dado">
              {{ lei.limiteDeEstoque | formatNumber }}
            </td>
          </tr>
          <tr>
            <td>Estoque consumido lei 11.732/95 (***)</td>
            <td class="dado">
              {{ lei.leiAntiga["consumidoArt6-1376904"] | formatNumber }}
            </td>
          </tr>
          <tr>
            <td>Estoque consumido lei 13.769/09 e lei 13.871/04</td>
            <td class="dado">
              {{ estoqueConsumidoTotal | formatNumber }}
            </td>
          </tr>
          <tr class="destaque">
            <td>SALDO ESTOQUE GERAL DISPONÍVEL</td>
            <td class="dado">
              {{ saldoTotal | formatNumber }}
            </td>
          </tr>
          <tr>
            <td>Estoque em análise</td>
            <td class="dado">
              {{ estoqueEmAnalise | formatNumber }}
            </td>
          </tr>
          <tfoot>
            <tr class="notas">
              <td colspan="2" class="nota">
                <ul>
                  <li>(*) Estoque consumido até a aprovação da lei Lei 13.769/04</li>
                  <li>(**) Estoque líquido a ser utilizado conforme artigo 6º e tabela 2 da lei 13.769/04</li>
                  <li>(***) Estoque consumido após a Lei 13.769/04</li>
                  <li>(*) + (***) Estoque total consumido pela Lei 11.732/95 = 1.184.719,95</li>
                </ul>
              </td>
            </tr>
          </tfoot>
        </table>
        <table class="tabelas__convertido-desvinculado block">
          <tr>
            <th rowspan="2">
              Setores
            </th>
            <th class="title" colspan="2">
              CEPAC convertido
            </th>
            <th class="title" colspan="2">
              CEPAC desvinculado
            </th>
          </tr>
          <tr>
            <td class="aca">
              ACA
            </td>
            <td>Uso e <br>Parâmetros</td>
            <td>ACA</td>
            <td>Uso e <br>Parâmetros</td>
          </tr>
          <tr>
            <td>Hélio Pelegrino</td>
            <td class="dado">
              {{ helioPelegrino[4].CepacACA | formatNumberInt }}
            </td>
            <td class="dado">
              {{ helioPelegrino[4].CepacUsoParam | formatNumberInt }}
            </td>
            <td class="dado">
              {{ lei.helioPelegrino.cepacDesvinculado.aca | formatNumberInt }}
            </td>
            <td class="dado">
              {{ lei.helioPelegrino.cepacDesvinculado.usoPar | formatNumberInt }}
            </td>
          </tr>
          <tr>
            <td>Faria Lima</td>
            <td class="dado">
              {{ fariaLima[4].CepacACA | formatNumberInt }}
            </td>
            <td class="dado">
              {{ fariaLima[4].CepacUsoParam | formatNumberInt }}
            </td>
            <td class="dado">
              {{ lei.fariaLima.cepacDesvinculado.aca | formatNumberInt }}
            </td>
            <td class="dado">
              {{ lei.fariaLima.cepacDesvinculado.usoPar | formatNumberInt }}
            </td>
          </tr>
          <tr>
            <td>Pinheiros</td>
            <td class="dado">
              {{ pinheiros[4].CepacACA | formatNumberInt }}
            </td>
            <td class="dado">
              {{ pinheiros[4].CepacUsoParam | formatNumberInt }}
            </td>
            <td class="dado">
              {{ lei.pinheiros.cepacDesvinculado.aca | formatNumberInt }}
            </td>
            <td class="dado">
              {{ lei.pinheiros.cepacDesvinculado.usoPar | formatNumberInt }}
            </td>
          </tr>
          <tr>
            <td>Olimpíadas</td>
            <td class="dado">
              {{ olimpiadas[4].CepacACA | formatNumberInt }}
            </td>
            <td class="dado">
              {{ olimpiadas[4].CepacUsoParam | formatNumberInt }}
            </td>
            <td class="dado">
              {{ lei.olimpiadas.cepacDesvinculado.aca | formatNumberInt }}
            </td>
            <td class="dado">
              {{ lei.olimpiadas.cepacDesvinculado.usoPar | formatNumberInt }}
            </td>
          </tr>
          <tr>
            <td>Subtotal</td>
            <td class="dado">
              {{ acaTotais.subTotalConvertido | formatNumberInt }}
            </td>
            <td class="dado">
              {{ acaTotais.subTotalConvertidoUsoPar | formatNumberInt }}
            </td>
            <td />
            <td />
          </tr>
          <tr class="destaque">
            <td>Totais</td>
            <td class="total" colspan="2">
              {{ acaTotais.totalConvertido | formatNumberInt }}
            </td>
            <td class="dado">
              {{ acaTotais.subtotalDesvinculado | formatNumberInt }}
            </td>
            <td class="dado">
              {{ acaTotais.subtotalDesvinculadoUsoPar | formatNumberInt }}
            </td>
          </tr>
        </table>
        <table class="tabelas__resumo block">
          <tr>
            <td colspan="2" class="title">
              Resumo CEPAC
            </td>
          </tr>
          <tr>
            <td>Leiloado</td>
            <td class="dado">
              {{ lei.resumo.leiloado | formatNumber }}
            </td>
          </tr>
          <tr>
            <td>Colocação privada</td>
            <td class="dado">
              {{ lei.resumo.colocacaoPrivada | formatNumber }}
            </td>
          </tr>
          <tr>
            <td>Convertido</td>
            <td class="dado">
              {{ acaTotais.totalConvertido | formatNumber }}
            </td>
          </tr>
          <tr class="destaque">
            <td>Em circulação</td>
            <td class="dado">
              {{ emCirculacao | formatNumber }}
            </td>
          </tr>
          <tr>
            <td>CEPAC total</td>
            <td class="dado">
              {{ lei.cepacTotal | formatNumber }}
            </td>
          </tr>
          <tr class="destaque">
            <td>CEPAC saldo</td>
            <td class="dado">
              {{ cepacSaldo | formatNumber }}
            </td>
          </tr>
        </table>
      </div>
      <div class="ultima-atualizacao">
        {{ lastUpdate }}
      </div>
    </section>

    <footer-actions
      :go-back-path="'/ouc-faria-lima'"
      :pdf-doc-definition="pdfDocDefinition"
      :json-doc-definition="estoques"
      :csv-doc-definition="estoques"
      :file-name="fileName"
    />
  </div>
</template>

<script>
import PageTitle from '~/components/sections/PageTitle'
import FooterActions from '~/components/sections/FooterActions'
import Preloader from '~/components/sections/Preloader'
import { oucFariaLima } from '~/static/data/estoques'
import { spurbanismoBase64 } from '~/assets/images/spurbanismoBase64'

export default {
  name: 'ControleEstoquesAca',
  components: {
    PageTitle,
    FooterActions,
    Preloader
  },
  data () {
    return {
      pdfDocDefinition: {},
      isFetching: false,
      error: false,
      lei: oucFariaLima,
      estoques: [],
      helioPelegrino: {},
      fariaLima: {},
      pinheiros: {},
      olimpiadas: {},
      mapSetores: {
        '1': 'helioPelegrino',
        '2': 'fariaLima',
        '3': 'pinheiros',
        '4': 'olimpiadas'
      },
      mapStatus: {
        '1': 'Checklist',
        '2': 'Em Análise',
        '3': 'Indeferido',
        '4': 'Aprovado'
      },
      saldoTotal: 0,
      estoqueConsumidoTotal: 0,
      estoqueEmAnalise: 0,
      acaTotais: {
        subTotalConvertido: 0,
        subTotalConvertidoUsoPar: 0,
        subtotalDesvinculado: 0,
        subtotalDesvinculadoUsoPar: 0,
        totalConvertido: 0
      },
      lastUpdate: '',
      saldos: {
        helioPelegrino: {
          residencial: 0,
          nR: 0
        },
        fariaLima: {
          residencial: 0,
          nR: 0
        },
        pinheiros: {
          residencial: 0,
          nR: 0
        },
        olimpiadas: {
          residencial: 0,
          nR: 0
        }
      }
    }
  },
  computed: {
    fileName () {
      const date = new Date().toISOString().slice(0, 19)
      return `${this.$route.path.slice(1).replace('/', '-')}_${date}`
    },
    emCirculacao () {
      return (oucFariaLima.resumo.leiloado + oucFariaLima.resumo.colocacaoPrivada - this.acaTotais.totalConvertido)
    },
    cepacSaldo () {
      return oucFariaLima.cepacTotal - oucFariaLima.resumo.leiloado - oucFariaLima.resumo.colocacaoPrivada
    },
    downloadTimeStamp () {
      const date = new Date()
      const dataStr = this.$options.filters.dateTimeStr(date.toISOString())
      const hh = date.getHours()
      const mm = date.getMinutes()
      const ss = date.getSeconds()

      return `Página visitada em ${dataStr} às ${hh}h${mm}m${ss}`
    }
  },
  created () {
    this.defineSubsetoresModel()
  },
  mounted () {
    this.isFetching = false
    this.$cepacs.get('estoque')
      .then((res) => {
        this.estoques = res.data
        this.populateModel(res.data)
        this.acaTotais = this.getAcaTotais()
        this.setLastUpdate(res.data)
        this.setSaldos(oucFariaLima, res.data)
      })
      .catch((error) => { if (error) { this.error = error } })
      .finally(() => {
        this.isFetching = false
        this.setPdfDocDefinition()
      })
  },
  methods: {
    setSaldos (lei) {
      this.saldos.helioPelegrino.residencial = lei.helioPelegrino.areaMax.res - this.helioPelegrino[4].AreaAdicionalR
      this.saldos.helioPelegrino.nR = lei.helioPelegrino.areaMax.nRes - this.helioPelegrino[4].AreaAdicionalNR
      this.saldos.fariaLima.residencial = lei.fariaLima.areaMax.res - this.fariaLima[4].AreaAdicionalR
      this.saldos.fariaLima.nR = lei.fariaLima.areaMax.nRes - this.fariaLima[4].AreaAdicionalNR
      this.saldos.pinheiros.residencial = lei.pinheiros.areaMax.res - this.pinheiros[4].AreaAdicionalR
      this.saldos.pinheiros.nR = lei.pinheiros.areaMax.nRes - this.pinheiros[4].AreaAdicionalNR
      this.saldos.olimpiadas.residencial = lei.olimpiadas.areaMax.res - this.olimpiadas[4].AreaAdicionalR
      this.saldos.olimpiadas.nR = lei.olimpiadas.areaMax.nRes - this.olimpiadas[4].AreaAdicionalNR
    },
    setLastUpdate (estoques) {
      const dateFiltered = index => this.$options.filters.dateTimeStr(estoques[index].Atualizacao)
      const lastUpdateStr = estoques
        .map((estoque, index) => {
          const dateStr = estoque.Atualizacao
          const cleanData = dateStr
            .slice(0, 10)
            .replace(/[-]/g, '') // 2019-11-19T15:35:36.893706 -> 20191119

          return {
            num: parseInt(cleanData),
            index
          }
        })
        .reduce((acc, curr) => {
          if (acc.num > curr.num) return acc
          else { return curr }
        })

      this.lastUpdate = `Última atualização: ${dateFiltered(lastUpdateStr.index)}`
    },
    fNum (num) { return this.$options.filters.formatNumber(num) },
    setPdfDocDefinition () {
      const dd = {
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
          title: 'Controle de Estoques da OUCFL',
          author: 'São Paulo Urbanismo',
          subject: 'Operação Urbana Consociada Faria Lima',
          keywords: 'ouc outorga cepac faria lima'
        },
        footer: {
          columns: [
            { text: this.downloadTimeStamp, margin: [20, 10, 0, 0] },
            { text: this.lastUpdate, margin: [0, 10, 0, 0] },
            { link: 'https://spurb.github.io/relatorios/ouc-faria-lima/resumo', text: 'Fonte: spurb.github.io/relatorios/ouc-faria-lima/resumo', alignment: 'right', margin: [0, 10, 20, 0] }
          ]
        },
        content: [
          { text: 'Operação Urbana Consociada Faria Lima', style: 'header' },
          {
            text: 'Lei 13.769/04, alterada pelas leis 13.871/04, 15.519/11 e 16.242/15',
            style: 'subheader',
            margin: [0, 0, 0, 20]
          },
          { text: 'Controle de Estoques de Área de Construção Adicional (ACA)', style: 'subheader' },
          {
            table: {
              body: [
                [
                  { text: 'Setores', rowSpan: 2 },
                  { text: 'Estoque máximo(m²) previsto para setores', colSpan: 2 }, {},
                  { text: 'Estoque consumido (m²)', colSpan: 2 }, {},
                  { text: 'Estoque em análise (m²)', colSpan: 2 }, {},
                  { text: 'Saldo de estoque máximo (m²) previsto para setores', colSpan: 2 }, {},
                  { text: 'Saldo estoque geral disponível para operação urbana (*)', colSpan: 2 }, {}
                ],
                [
                  'Não residencial',
                  'Residencial',
                  'Não residencial',
                  'Residencial',
                  'Não residencial',
                  'Residencial',
                  'Não residencial',
                  'Residencial',
                  'Não residencial',
                  'Residencial',
                  'Não residencial'
                ],
                [
                  'Hélio Pelegrino',
                  { text: this.fNum(oucFariaLima.helioPelegrino.areaMax.res), alignment: 'right' },
                  { text: this.fNum(oucFariaLima.helioPelegrino.areaMax.nRes), alignment: 'right' },
                  { text: this.fNum(this.helioPelegrino[4].AreaAdicionalR), alignment: 'right' },
                  { text: this.fNum(this.helioPelegrino[4].AreaAdicionalNR), alignment: 'right' },
                  { text: this.fNum(this.helioPelegrino[2].AreaAdicionalR), alignment: 'right' },
                  { text: this.fNum(this.helioPelegrino[2].AreaAdicionalNR), alignment: 'right' },
                  { text: this.fNum(this.saldos.helioPelegrino.residencial), alignment: 'right' },
                  { text: this.fNum(this.saldos.helioPelegrino.nR), alignment: 'right' },
                  { text: this.fNum(this.saldoTotal), colSpan: 2, rowSpan: 4, alignment: 'center' }, {}
                ],
                [
                  'Faria Lima',
                  { text: this.fNum(oucFariaLima.fariaLima.areaMax.res), alignment: 'right' },
                  { text: this.fNum(oucFariaLima.fariaLima.areaMax.nRes), alignment: 'right' },
                  { text: this.fNum(this.fariaLima[4].AreaAdicionalR), alignment: 'right' },
                  { text: this.fNum(this.fariaLima[4].AreaAdicionalNR), alignment: 'right' },
                  { text: this.fNum(this.fariaLima[2].AreaAdicionalR), alignment: 'right' },
                  { text: this.fNum(this.fariaLima[2].AreaAdicionalNR), alignment: 'right' },
                  { text: this.fNum(this.saldos.fariaLima.residencial), alignment: 'right' },
                  { text: this.fNum(this.saldos.fariaLima.nR), alignment: 'right' }
                ],
                [
                  'Pinheiros',
                  { text: this.fNum(oucFariaLima.pinheiros.areaMax.res), alignment: 'right' },
                  { text: this.fNum(oucFariaLima.pinheiros.areaMax.nRes), alignment: 'right' },
                  { text: this.fNum(this.pinheiros[4].AreaAdicionalR), alignment: 'right' },
                  { text: this.fNum(this.pinheiros[4].AreaAdicionalNR), alignment: 'right' },
                  { text: this.fNum(this.pinheiros[2].AreaAdicionalR), alignment: 'right' },
                  { text: this.fNum(this.pinheiros[2].AreaAdicionalNR), alignment: 'right' },
                  { text: this.fNum(this.saldos.pinheiros.residencial), alignment: 'right' },
                  { text: this.fNum(this.saldos.pinheiros.nR), alignment: 'right' }
                ],
                [
                  'Olimpiadas',
                  { text: this.fNum(oucFariaLima.olimpiadas.areaMax.res), alignment: 'right' },
                  { text: this.fNum(oucFariaLima.olimpiadas.areaMax.nRes), alignment: 'right' },
                  { text: this.fNum(this.olimpiadas[4].AreaAdicionalR), alignment: 'right' },
                  { text: this.fNum(this.olimpiadas[4].AreaAdicionalNR), alignment: 'right' },
                  { text: this.fNum(this.olimpiadas[2].AreaAdicionalR), alignment: 'right' },
                  { text: this.fNum(this.olimpiadas[2].AreaAdicionalNR), alignment: 'right' },
                  { text: this.fNum(this.saldos.olimpiadas.residencial), alignment: 'right' },
                  { text: this.fNum(this.saldos.olimpiadas.nR), alignment: 'right' }
                ]
              ]
            }

          },
          { text: '(*) Saldo com base no limite de estoque líquido disponibilizado pelo Artigo 6º e Tabela 2 da Lei 13.769/04 ', style: 'footNoteSyle' },
          { text: '', margin: [0, 20, 0, 0] },
          { text: 'Limite de estoque para efeito de oferta de CEPAC', style: 'subheader' },
          {
            table: {
              body: [
                ['Estoque GERAL (aprovado pela 11.732/95)', { text: this.fNum(oucFariaLima.estoqueGeral), alignment: 'right' }],
                ['Estoque cosumido lei 11.732/95', { text: this.fNum(oucFariaLima.leiAntiga['consumidoPre-1376904']), alignment: 'right' }],
                ['LIMITE DE ESTOQUE - Leis 13.769/04 e 13.871/04 (**)', { text: this.fNum(oucFariaLima.limiteDeEstoque), alignment: 'right' }],
                ['Estoque consumido lei 11.732/95 (***)', { text: this.fNum(oucFariaLima.leiAntiga['consumidoArt6-1376904']), alignment: 'right' }],
                ['Estoque consumido lei 13.769/09 e lei 13.871/04', { text: this.fNum(this.estoqueConsumidoTotal), alignment: 'right' }],
                ['SALDO ESTOQUE GERAL DISPONÍVEL', { text: this.fNum(this.saldoTotal), alignment: 'right' }],
                ['Estoque em análise', { text: this.fNum(this.estoqueEmAnalise), alignment: 'right' }]
              ]
            }
          },
          { text: '(*) Estoque consumido até a aprovação da lei Lei 13.769/04', style: 'footNoteSyle' },
          { text: '(**) Estoque líquido a ser utilizado conforme artigo 6º e tabela 2 da lei 13.769/04', style: 'footNoteSyle' },
          { text: '(***) Estoque consumido após a Lei 13.769/04', style: 'footNoteSyle' },
          { text: '(*) + (***) Estoque total consumido pela Lei 11.732/95 = 1.184.719,95', style: 'footNoteSyle' },
          { text: '', margin: [0, 20, 0, 0] },
          { headlineLevel: 2, text: 'CEPAC convertido e desvinculado ', style: 'subheader' },
          {
            table: {
              body: [
                [
                  { text: 'Setores', rowSpan: 2 },
                  { text: 'CEPAC convertido', colSpan: 2 }, {},
                  { text: 'CEPAC desvinculado', colSpan: 2 }, {}
                ],
                ['', 'ACA', 'Uso e Parâmetros', 'ACA', 'Uso e Parâmetros'],
                [
                  'Hélio Pelegrino',
                  { text: this.fNum(this.helioPelegrino[4].CepacACA), alignment: 'right' },
                  { text: this.fNum(this.helioPelegrino[4].CepacUsoParam), alignment: 'right' },
                  { text: this.fNum(oucFariaLima.helioPelegrino.cepacDesvinculado.aca), alignment: 'right' },
                  { text: this.fNum(oucFariaLima.helioPelegrino.cepacDesvinculado.usoPar), alignment: 'right' }
                ],
                [
                  'Faria Lima',
                  { text: this.fNum(this.fariaLima[4].CepacACA), alignment: 'right' },
                  { text: this.fNum(this.fariaLima[4].CepacUsoParam), alignment: 'right' },
                  { text: this.fNum(oucFariaLima.fariaLima.cepacDesvinculado.aca), alignment: 'right' },
                  { text: this.fNum(oucFariaLima.fariaLima.cepacDesvinculado.usoPar), alignment: 'right' }
                ],
                [
                  'Pinheiros',
                  { text: this.fNum(this.pinheiros[4].CepacACA), alignment: 'right' },
                  { text: this.fNum(this.pinheiros[4].CepacUsoParam), alignment: 'right' },
                  { text: this.fNum(oucFariaLima.pinheiros.cepacDesvinculado.aca), alignment: 'right' },
                  { text: this.fNum(oucFariaLima.pinheiros.cepacDesvinculado.usoPar), alignment: 'right' }
                ],
                [
                  'Olimpíadas',
                  { text: this.fNum(this.olimpiadas[4].CepacACA), alignment: 'right' },
                  { text: this.fNum(this.olimpiadas[4].CepacUsoParam), alignment: 'right' },
                  { text: this.fNum(oucFariaLima.olimpiadas.cepacDesvinculado.aca), alignment: 'right' },
                  { text: this.fNum(oucFariaLima.olimpiadas.cepacDesvinculado.usoPar), alignment: 'right' }
                ],
                [
                  'Subtotal',
                  { text: this.fNum(this.acaTotais.subTotalConvertido), alignment: 'right' },
                  { text: this.fNum(this.acaTotais.subTotalConvertidoUsoPar), alignment: 'right' },
                  { text: '', colspan: 2 },
                  {}
                ],
                [
                  'Totais',
                  { text: this.fNum(this.acaTotais.totalConvertido), colSpan: 2 },
                  {},
                  { text: this.fNum(this.acaTotais.subtotalDesvinculado), alignment: 'center' },
                  { text: this.fNum(this.acaTotais.subtotalDesvinculadoUsoPar), alignment: 'right' }
                ]
              ]
            }
          },
          { text: '', margin: [0, 40, 0, 0] },
          { text: 'Resumo CEPAC', style: 'subheader' },
          {
            table: {
              body: [
                ['Leiloado', { text: this.fNum(oucFariaLima.resumo.leiloado), alignment: 'right' }],
                ['Colocação privada', { text: this.fNum(oucFariaLima.resumo.colocacaoPrivada), alignment: 'right' }],
                ['Convertido', { text: this.fNum(this.acaTotais.totalConvertido), alignment: 'right' }],
                ['Em circulação', { text: this.fNum(this.emCirculacao), alignment: 'right' }],
                ['CEPAC total', { text: this.fNum(oucFariaLima.cepacTotal), alignment: 'right' }],
                ['CEPAC saldo', { text: this.fNum(this.cepacSaldo), alignment: 'right' }]
              ]
            }
          }
        ],
        styles: {
          header: {
            fontSize: 14,
            margin: [0, 0, 0, 10]
          },
          subheader: {
            fontSize: 12,
            margin: [0, 10, 0, 5]
          },
          tableExample: {
            margin: [0, 5, 0, 15]
          },
          tableHeader: {
            bold: true,
            fontSize: 8,
            color: 'black'
          },
          footNoteSyle: {
            fontSize: 8,
            margin: [0, 5, 0, 0]
          }
        },
        defaultStyle: {
          alignment: 'left',
          cellBorder: 0,
          fontSize: 8
        },

        pageBreakBefore (currentNode) {
          return currentNode.headlineLevel === 2
        }
      }
      this.pdfDocDefinition = dd
    },
    getAcaTotais () {
      const subTotalConvertido =
        this.helioPelegrino[4].CepacACA +
        this.fariaLima[4].CepacACA +
        this.pinheiros[4].CepacACA +
        this.olimpiadas[4].CepacACA

      const subTotalConvertidoUsoPar =
        this.helioPelegrino[4].CepacUsoParam +
        this.fariaLima[4].CepacUsoParam +
        this.pinheiros[4].CepacUsoParam +
        this.olimpiadas[4].CepacUsoParam

      const totalConvertido = subTotalConvertido + subTotalConvertidoUsoPar

      const subtotalDesvinculado =
          oucFariaLima.helioPelegrino.cepacDesvinculado.aca +
          oucFariaLima.fariaLima.cepacDesvinculado.aca +
          oucFariaLima.pinheiros.cepacDesvinculado.aca +
          oucFariaLima.olimpiadas.cepacDesvinculado.aca

      const subtotalDesvinculadoUsoPar =
          oucFariaLima.helioPelegrino.cepacDesvinculado.usoPar +
          oucFariaLima.fariaLima.cepacDesvinculado.usoPar +
          oucFariaLima.pinheiros.cepacDesvinculado.usoPar +
          oucFariaLima.olimpiadas.cepacDesvinculado.usoPar

      return {
        subTotalConvertido,
        subTotalConvertidoUsoPar,
        totalConvertido,
        subtotalDesvinculado,
        subtotalDesvinculadoUsoPar
      }
    },
    defineSubsetoresModel () {
      const statusIds = Object.keys(this.mapSetores)
      const setores = this.mapSetores
      for (const setorId in setores) {
        statusIds.forEach((statusId) => {
          this[setores[setorId]][statusId] = {
            AreaAdicionalNR: 0,
            AreaAdicionalR: 0,
            CepacACA: 0,
            CepacUsoParam: 0,
            IdStatus: parseInt(statusId),
            Setor: parseInt(setorId),
            StatusNome: this.mapStatus[statusId]
          }
        })
      }
    },
    populateModel (response) {
      const estoquesMapped = response.map((estoque) => { // substitui por valores da requisição (asyncData) armazenados em this.estoques
        const StatusNome = this.mapStatus[estoque.IdStatus]
        estoque.StatusNome = StatusNome
        return estoque
      })

      const dividePorEtapa = (setorId) => {
        const setorNome = this.mapSetores[setorId]
        estoquesMapped
          .filter(estoque => estoque.Setor === setorId)
          .forEach((estoque) => { this[setorNome][estoque.IdStatus] = estoque })
      }
      dividePorEtapa(1)
      dividePorEtapa(2)
      dividePorEtapa(3)
      dividePorEtapa(4)

      this.estoqueConsumidoTotal = response// atualiza estoqueConsumidoTotal e saldoTotal
        .filter(estoque => estoque.IdStatus === 4)
        .map(estoque => estoque.AreaAdicionalR + estoque.AreaAdicionalNR)
        .reduce((acc, curr) => acc + curr)

      this.saldoTotal = (oucFariaLima.limiteDeEstoque - this.estoqueConsumidoTotal - oucFariaLima.leiAntiga['consumidoArt6-1376904'])

      this.estoqueEmAnalise = response// atualiza estoqueEmAnalise
        .filter(estoque => estoque.IdStatus === 2)
        .map(estoque => estoque.AreaAdicionalR + estoque.AreaAdicionalNR)
        .reduce((acc, curr) => acc + curr)
    }
  },
  head () {
    return {
      title: 'OUC Faria Lima | Controle de estoques de área de construção adicional - ACA',
      meta: [{ hid: 'relatorios', name: 'relatorios', content: "Operação Urbana Consorciada Faria Lima CEPAC'S desvinculados" }]
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/variables';
$line-1px: solid #333333 1px;

table {
  border-collapse: collapse;
  td {
    border-bottom: $line-1px;
  }
}

.tabelas {
  &.isFetching {
    display: none
  }
}

.tabela-aca {
  width: calc(100% - 2em);
  h3 {
    font-size: 21px;
    font-weight: 400;
    padding: 1.3rem 0;
  }
  td {
    font-size: 14px;
    padding: 0.5rem 0;
  }
  tr.tabela-aca__header td {
    &:first-child { border-left:0 }
    border-top: 0;
    border-left: 1rem solid #FFF;
  }
  tr.conteudo td {
    text-align: right;
    border-left: 1rem solid #FFF;
    &.destaque {
      text-align: center;
      font-weight: 700;
      background-color: #F5F5F5;
    }
    &.title {
      text-align: left;
      border-left: 0
    }
  }
  tr.r-nr td {
    padding-left: 7px;
  }
}

.tabelas-container {
  display: flex;
  margin: 1rem;
  justify-content: space-between;
  .block {
    margin-right: 1rem;
    margin-left: 0;
    &:last-child {
      margin-right: 0;
    }
  }
  @media (max-width: $desktop) {
    flex-direction: column;
    .block {
      width: 100%;
    }
  }
}

.tabelas__convertido-desvinculado {
  min-width: 40%;
  th {
      text-align: left;
      border-bottom: $line-1px;

  }
  td {
    padding: 0.5rem 0;
    border-left: 1rem solid #FFF;
    &.aca {
      min-width: 30px;
    }
    &:first-child, &:last-child {
      border-left: 0
    }
  }
}

.tabelas__resumo {
  min-width: 20%;
  width: auto;
  &.block {
    margin-bottom: 0
  }
}

.tabelas__resumo, .tabelas__limite {
  line-height: 2.5
}

.block {
  margin: 1rem 1rem 2rem;
  border-top: solid #4F4F4F 10px;
  border-bottom: solid #4F4F4F 5px;
}

.notas, table, td {
  font-size: 14px
}

.dado {
  text-align: right
}

.notas{
  padding: 1rem 0;
}

.title {
  font-size: 21px;
  text-align: left;
  padding: 1rem 0;
}

.total {
  text-align: center
}

.destaque {
  font-weight: 700;
  background-color: #F5F5F5;
  td {
    border: 0
  }
}
.ultima-atualizacao {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 4rem;
}

</style>
