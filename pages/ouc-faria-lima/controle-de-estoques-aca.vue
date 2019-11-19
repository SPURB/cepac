<template>
  <div class="estoque-aca">
    <PageTitle :two-columns="true">
      <div class="col-1">
        <h1>Operação Urbana Consociada Faria Lima</h1>
        <h2>Lei 13.769/04, alterada pelas leis 13.871, 15.519/11 e 16.242/15</h2>
      </div>
      <div class="col-2">
        <p>Fontes:</p>
        <ul>
          <li class="fonte">
            <a href="https://servicos.spurbanismo.sp.gov.br/cepacs/api/estoque/">Dados resumidos de estoque</a>
          </li>
          <li class="fonte">
            <a href="/data/estoques.json">Dados gereais da OUCFL</a>
          </li>
        </ul>
      </div>
    </PageTitle>

    <Preloader :is-fetching="isFetching" :error="error" />

    <div class="estoques-aca block">
      <h3>Controle de Estoques de Área de Construção Adicional (ACA)</h3>
      <ul class="tabela">
        <li class="cabecalho A1-B2">
          Setores
        </li>
        <li class="cabecalho C1-D1">
          Estoque máximo (m²) previsto para setores
        </li>
        <li class="cabecalho">
          Residencial
        </li>
        <li class="cabecalho">
          Não Residencial
        </li>
        <li class="cabecalho E1-F1">
          Estoque consumido (m²)
        </li>
        <li class="cabecalho">
          Residencial
        </li>
        <li class="cabecalho">
          Não Residencial
        </li>
        <li class="cabecalho G1-H1">
          Estoque em análise (m²)
        </li>
        <li class="cabecalho">
          Residencial
        </li>
        <li class="cabecalho">
          Não Residencial
        </li>
        <li class="cabecalho I1-J2">
          Saldo de estoque máximo (m²) previsto para setores
        </li>
        <li class="cabecalho">
          Residencial
        </li>
        <li class="cabecalho">
          Não Residencial
        </li>
        <li class="cabecalho K1-L1">
          Saldo estoque geral disponível para Operação Urbana (*)
        </li>
        <li class="cabecalho">
          Residencial
        </li>
        <li class="cabecalho">
          Não Residencial
        </li>
        <li class="conteudo A3-B3">
          Hélio Pelegrino
        </li>
        <li class="conteudo">
          {{ lei.helioPelegrino.areaMax.res.toFixed(2) }}
        </li>
        <li class="conteudo">
          {{ lei.helioPelegrino.areaMax.nRes.toFixed(2) }}
        </li>
        <li class="conteudo">
          {{ helioPelegrino[4].AreaAdicionalR.toFixed(2) }}
        </li>
        <li class="conteudo">
          {{ helioPelegrino[4].AreaAdicionalNR.toFixed(2) }}
        </li>
        <li class="conteudo">
          {{ helioPelegrino[2].AreaAdicionalR.toFixed(2) }}
        </li>
        <li class="conteudo">
          {{ helioPelegrino[2].AreaAdicionalNR.toFixed(2) }}
        </li>
        <li class="conteudo">
          <!-- fixed -->
          {{ helioPelegrinoSaldoRes }}
        </li>
        <!-- fixed -->
        <li class="conteudo">
          {{ helioPelegrinoSaldoNres }}
        </li>
        <li class="conteudo A4-B4">
          Faria Lima
        </li>
        <li class="conteudo">
          {{ lei.fariaLima.areaMax.res.toFixed(2) }}
        </li>
        <li class="conteudo">
          {{ lei.fariaLima.areaMax.nRes.toFixed(2) }}
        </li>
        <li class="conteudo">
          {{ fariaLima[4].AreaAdicionalR.toFixed(2) }}
        </li>
        <li class="conteudo">
          {{ fariaLima[4].AreaAdicionalNR.toFixed(2) }}
        </li>
        <li class="conteudo">
          {{ fariaLima[2].AreaAdicionalR.toFixed(2) }}
        </li>
        <li class="conteudo">
          {{ fariaLima[2].AreaAdicionalNR.toFixed(2) }}
        </li>
        <li class="conteudo">
          <!-- fixed -->
          {{ fariaLimaSaldoRes }}
        </li>
        <li class="conteudo">
          <!-- fixed -->
          {{ fariaLimaSaldoSaldoNres }}
        </li>
        <li class="conteudo A5-B5">
          Pinheiros
        </li>
        <li class="conteudo">
          <!-- C5 -->
          {{ lei.pinheiros.areaMax.res.toFixed(2) }}
        </li>
        <li class="conteudo">
          <!-- D5 -->
          {{ lei.pinheiros.areaMax.nRes.toFixed(2) }}
        </li>
        <li class="conteudo">
          <!-- E5 -->
          {{ pinheiros[4].AreaAdicionalR.toFixed(2) }}
        </li>
        <li class="conteudo">
          <!-- F5 -->
          {{ pinheiros[4].AreaAdicionalNR.toFixed(2) }}
        </li>
        <li class="conteudo">
          <!-- G5 -->
          {{ pinheiros[2].AreaAdicionalR.toFixed(2) }}
        </li>
        <li class="conteudo">
          <!-- H5 -->
          {{ pinheiros[2].AreaAdicionalNR.toFixed(2) }}
        </li>
        <li class="conteudo">
          <!-- fixed -->
          {{ pinheirosSaldoRes }}
        </li>
        <li class="conteudo">
          <!-- fixed -->
          {{ pinheirosSaldoNres }}
        </li>
        <li class="conteudo A6-B6">
          Olimpíadas
        </li>
        <li class="conteudo">
          <!-- C6 -->
          {{ lei.olimpiadas.areaMax.res.toFixed(2) }}
        </li>
        <li class="conteudo">
          <!-- D6 -->
          {{ lei.olimpiadas.areaMax.nRes.toFixed(2) }}
        </li>
        <li class="conteudo">
          <!-- E6 -->
          {{ olimpiadas[4].AreaAdicionalR.toFixed(2) }}
        </li>
        <li class="conteudo">
          <!-- F6 -->
          {{ olimpiadas[4].AreaAdicionalNR.toFixed(2) }}
        </li>
        <li class="conteudo">
          <!-- G6 -->
          {{ olimpiadas[2].AreaAdicionalR.toFixed(2) }}
        </li>
        <li class="conteudo">
          <!-- H6 -->
          {{ olimpiadas[2].AreaAdicionalNR.toFixed(2) }}
        </li>
        <li class="conteudo">
          <!-- fixed -->
          {{ olimpiadasSaldoRes }}
        </li>
        <li class="conteudo">
          <!-- fixed -->
          {{ olimpiadasSaldoNres }}
        </li>
        <li class="conteudo K3-L6 destaque">
          {{ saldoTotal }}
        </li>
      </ul>
      <ul class="notas">
        <li class="nota">
          (*) Saldo com base no limite de estoque líquido disponibilizado pelo Artigo 6º e Tabela 2 da Lei 13.769/04
        </li>
      </ul>
    </div>
    <div class="tabelas-grid-container">
      <div class="estoque-limite block">
        <h3>Limite de estoque para efeito de oferta de CEPAC</h3>
        <ul class="tabela">
          <li class="cabecalho">
            Estoque GERAL (aprovado pela 11.732/95)
          </li>
          <li class="conteudo">
            {{ lei.estoqueGeral.toFixed(2) }}
          </li>

          <li class="cabecalho">
            Estoque cosumido lei 11.732/95
          </li>
          <li class="conteudo">
            {{ lei.leiAntiga["consumidoPre-1376904"].toFixed(2) }}
          </li>

          <li class="cabecalho">
            LIMITE DE ESTOQUE - Leis 13.769/04 e 13.871/04 (**)
          </li>
          <li class="conteudo">
            {{ lei.limiteDeEstoque.toFixed(2) }}
          </li>

          <li class="cabecalho">
            Estoque consumido lei 11.732/95 (***)
          </li>
          <li class="conteudo">
            {{ lei.leiAntiga["consumidoArt6-1376904"].toFixed(2) }}
          </li>

          <li class="cabecalho">
            Estoque consumido lei 13.769/09 e lei 13.871/04
          </li>
          <li class="conteudo">
            {{ estoqueConsumidoTotal.toFixed(2) }}
          </li>

          <li class="cabecalho destaque">
            SALDO ESTOQUE GERAL DISPONÍVEL
          </li>
          <li class="conteudo destaque">
            {{ saldoTotal }}
          </li>

          <li class="cabecalho">
            Estoque em análise
          </li>
          <li class="conteudo">
            {{ estoqueEmAnalise }}
          </li>
        </ul>
        <ul class="notas">
          <li class="nota">
            (*) Estoque consumido até a aprovação da lei Lei 13.769/04
          </li>
          <li class="nota">
            (**) Estoque líquido a ser utilizado conforme artigo 6º e tabela 2 da lei 13.769/04
          </li>
          <li class="nota">
            (***) Estoque consumido após a Lei 13.769/04
          </li>
          <li class="nota">
            (*) + (***) Estoque total consumido pela Lei 11.732/95 = 118471995
          </li>
        </ul>
      </div>
      <div class="convertido-desvinculado block">
        <ul class="tabela header">
          <li class="cabecalho A1-B2">
            Setores
          </li>
          <li class="cabecalho C1-D1">
            <h3>CEPAC convertido</h3>
          </li>
          <li class="cabecalho E1-F1">
            <h3>CEPAC desvinculado</h3>
          </li>
          <li class="cabecalho">
            ACA
          </li>
          <li class="cabecalho">
            Uso e parâmetros
          </li>
          <li class="cabecalho">
            ACA
          </li>
          <li class="cabecalho">
            Uso e parâmetros
          </li>
        </ul>
        <ul class="tabela main">
          <li class="conteudo A1-B1">
            Hélio Pelegrino
          </li>
          <li class="conteudo">
            {{ helioPelegrino[4].CepacACA.toFixed(2) }}
          </li>
          <li class="conteudo">
            {{ helioPelegrino[4].CepacUsoParam.toFixed(2) }}
          </li>
          <li class="conteudo">
            {{ lei.helioPelegrino.cepacDesvinculado.aca.toFixed(2) }}
          </li>
          <li class="conteudo">
            {{ lei.helioPelegrino.cepacDesvinculado.usoPar.toFixed(2) }}
          </li>
          <li class="conteudo A2-B2">
            Faria Lima
          </li>
          <li class="conteudo">
            {{ fariaLima[4].CepacACA.toFixed(2) }}
          </li>
          <li class="conteudo">
            {{ fariaLima[4].CepacUsoParam.toFixed(2) }}
          </li>
          <li class="conteudo">
            {{ lei.fariaLima.cepacDesvinculado.aca.toFixed(2) }}
          </li>
          <li class="conteudo">
            {{ lei.fariaLima.cepacDesvinculado.usoPar.toFixed(2) }}
          </li>
          <li class="conteudo A3-B3">
            Pinheiros
          </li>
          <li class="conteudo">
            {{ pinheiros[4].CepacACA.toFixed(2) }}
          </li>
          <li class="conteudo">
            {{ pinheiros[4].CepacUsoParam.toFixed(2) }}
          </li>
          <li class="conteudo">
            {{ lei.pinheiros.cepacDesvinculado.aca.toFixed(2) }}
          </li>
          <li class="conteudo">
            {{ lei.pinheiros.cepacDesvinculado.usoPar.toFixed(2) }}
          </li>
          <li class="conteudo A4-B4">
            Olimpíadas
          </li>
          <li class="conteudo">
            {{ olimpiadas[4].CepacACA.toFixed(2) }}
          </li>
          <li class="conteudo">
            {{ olimpiadas[4].CepacUsoParam.toFixed(2) }}
          </li>
          <li class="conteudo">
            {{ lei.olimpiadas.cepacDesvinculado.aca.toFixed(2) }}
          </li>
          <li class="conteudo">
            {{ lei.olimpiadas.cepacDesvinculado.usoPar.toFixed(2) }}
          </li>
          <li class="conteudo A5-B5">
            Subtotal
          </li>
          <li class="conteudo">
            {{ acaTotais.subTotalConvertido.toFixed(2) }}
          </li>
          <li class="conteudo">
            {{ acaTotais.subTotalConvertidoUsoPar.toFixed(2) }}
          </li>
          <li class="conteudo" />
          <li class="conteudo" />
          <li class="conteudo A6-B6 destaque">
            Totais
          </li>
          <li class="conteudo C8-D8 destaque">
            {{ acaTotais.totalConvertido.toFixed(2) }}
          </li>
          <li class="conteudo E8-F8 destaque">
            {{ acaTotais.subtotalDesvinculado.toFixed(2) }}
          </li>
          <li class="conteudo G8-H8 destaque">
            {{ acaTotais.subtotalDesvinculadoUsoPar.toFixed(2) }}
          </li>
        </ul>
        <ul class="notas">
          <li class="nota">
            Obs: Verificar no site o detalhamento das desvinculações, com as respectivas datas de desvinculação, para observância do estabelecido no Decreto nº 53.094/2012, artigo 37, parágrafo § 4º e § 5º e Portaria nº 74/2012/SMDU.G
          </li>
        </ul>
      </div>
      <div class="resumo block">
        <h3>Resumo CEPAC</h3>
        <ul class="tabela">
          <li class="cabecalho">
            Leiloado
          </li>
          <li class="conteudo">
            {{ lei.resumo.leiloado.toFixed(2) }}
          </li>
          <li class="cabecalho">
            Colocação privada
          </li>
          <li class="conteudo">
            {{ lei.resumo.colocacaoPrivada.toFixed(2) }}
          </li>
          <li class="cabecalho">
            Convertido
          </li>
          <li class="conteudo">
            {{ acaTotais.totalConvertido.toFixed(2) }}
          </li>
          <li class="cabecalho destaque">
            Em circulação
          </li>
          <li class="conteudo destaque">
            {{ emCirculacao.toFixed(2) }}
          </li>
          <li class="cabecalho">
            CEPAC total
          </li>
          <li class="conteudo">
            {{ lei.cepacTotal.toFixed(2) }}
          </li>
          <li class="cabecalho destaque saldo">
            CEPAC saldo
          </li>
          <li class="conteudo destaque saldo">
            {{ cepacSaldo.toFixed(2) }}
          </li>
        </ul>
      </div>
    </div>
    <FooterActions
      :actions="pageActions"
      :go-back-path="'/ouc-faria-lima'"
      :pdf="true"
    />
  </div>
</template>

<script>
import axios from '~/plugins/axios'
import PageTitle from '~/components/sections/PageTitle'
import FooterActions from '~/components/sections/FooterActions'
import Preloader from '~/components/sections/Preloader'
import { oucFariaLima } from '~/static/data/estoques'

export default {
  name: 'ControleEstoquesAca',
  components: {
    PageTitle,
    FooterActions,
    Preloader
  },
  data () {
    return {
      isFetching: false,
      error: false,
      pageActions: [],
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
      }
    }
  },
  computed: {
    helioPelegrinoSaldoRes () {
      return (this.lei.helioPelegrino.areaMax.res - this.helioPelegrino[4].AreaAdicionalR).toFixed(2)
    },
    helioPelegrinoSaldoNres () {
      return (this.lei.helioPelegrino.areaMax.nRes - this.helioPelegrino[4].AreaAdicionalNR).toFixed(2)
    },
    fariaLimaSaldoRes () {
      return (this.lei.fariaLima.areaMax.res - this.fariaLima[4].AreaAdicionalR).toFixed(2)
    },
    fariaLimaSaldoSaldoNres () {
      return (this.lei.fariaLima.areaMax.nRes - this.fariaLima[4].AreaAdicionalNR).toFixed(2)
    },
    pinheirosSaldoRes () {
      return (this.lei.pinheiros.areaMax.res - this.pinheiros[4].AreaAdicionalR).toFixed(2)
    },
    pinheirosSaldoNres () {
      return (this.lei.pinheiros.areaMax.nRes - this.pinheiros[4].AreaAdicionalNR).toFixed(2)
    },
    olimpiadasSaldoRes () {
      return (this.lei.olimpiadas.areaMax.res - this.olimpiadas[4].AreaAdicionalR).toFixed(2)
    },
    olimpiadasSaldoNres () {
      return (this.lei.olimpiadas.areaMax.nRes - this.olimpiadas[4].AreaAdicionalNR).toFixed(2)
    },
    emCirculacao () {
      return (this.lei.resumo.leiloado + this.lei.resumo.colocacaoPrivada - this.acaTotais.totalConvertido)
    },
    cepacSaldo () {
      return this.lei.cepacTotal - this.lei.resumo.leiloado - this.lei.resumo.colocacaoPrivada
    }
  },
  created () {
    this.defineSubsetoresModel()
  },
  mounted () {
    this.isFetching = true
    axios.get(`/estoque/`)
      .then((res) => {
        this.estoques = res.data
        this.populateModel(res.data)
        this.acaTotais = this.getAcaTotais()
        this.setPageActions('controle-de-estoques.json', res.data)
        this.setPageActions('controle-de-estoques.csv', res.data)
      })
      .catch((error) => { if (error) { this.error = error } })
      .finally(() => {
        this.isFetching = false
      })
  },
  methods: {
    setPageActions (name, content) {
      const nameSplit = name.split('.') // ['name', 'extension']
      const d = new Date()
      const dateStr = `${d.getFullYear()}-${d.getMonth()}-${d.getDay()}_${d.getHours()}h${d.getMinutes()}`
      nameSplit.splice(nameSplit.length - 1, 0, dateStr)
      const fileNameWithDate = nameSplit.join('.')

      this.pageActions.push({
        fileName: fileNameWithDate,
        content
      })
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
          this.lei.helioPelegrino.cepacDesvinculado.aca +
          this.lei.fariaLima.cepacDesvinculado.aca +
          this.lei.pinheiros.cepacDesvinculado.aca +
          this.lei.olimpiadas.cepacDesvinculado.aca

      const subtotalDesvinculadoUsoPar =
          this.lei.helioPelegrino.cepacDesvinculado.usoPar +
          this.lei.fariaLima.cepacDesvinculado.usoPar +
          this.lei.pinheiros.cepacDesvinculado.usoPar +
          this.lei.olimpiadas.cepacDesvinculado.usoPar

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

      this.saldoTotal = (this.lei.limiteDeEstoque - this.estoqueConsumidoTotal - this.lei.leiAntiga['consumidoArt6-1376904']).toFixed(2)

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

@page {
   size: landscape
}

$line-1px: solid #333333 1px;

.block {
  margin: 1rem 1rem 3rem;
  border-top: solid #4F4F4F 10px;
  border-bottom: solid #4F4F4F 5px;
  h3 {
    font-size: 21px;
    font-weight: 400;
    padding: 1.3rem 0;
  }
}

.notas{
  padding: 1rem 0;
  font-size: 14px;
}

.tabela {
  display: grid;
  grid-column-gap: 1rem;
  border-bottom: solid #4F4F4F 1px;
  padding-bottom: 0.5rem;
  li {
    display: flex;
    align-items: center;
    font-size: 14px;
    &.conteudo {
      justify-content: flex-end;
    }
    &.destaque {
      font-weight: 700;
      background-color: #F5F5F5
    }
  }
}

.estoques-aca {
  h3 { border-bottom: $line-1px }
  .tabela {
    grid-template-columns: repeat(12, 1fr);
    grid-template-rows: repeat(6, 1fr);
    .cabecalho.A1-B2 {
      grid-area: 1 / 1 / 3 / 3;
      border-left: unset
    }
    .cabecalho.C1-D1 { grid-area: 1 / 3 / 2 / 5 }
    .cabecalho.E1-F1 { grid-area: 1 / 5 / 2 / 7 }
    .cabecalho.G1-H1 { grid-area: 1 / 7 / 2 / 9 }
    .cabecalho.I1-J2 { grid-area: 1 / 9 / 2 / 11 }
    .cabecalho.K1-L1 { grid-area: 1 / 11 / 2 / 13 }

    .cabecalho.C1-D1,
    .cabecalho.E1-F1,
    .cabecalho.G1-H1,
    .cabecalho.I1-J2,
    .cabecalho.K1-L1 {
      border-bottom: $line-1px;
    }

    .conteudo { border-top: $line-1px; }
    .conteudo.A3-B3 { grid-area: 3 / 1 / 4 / 3 }
    .conteudo.A4-B4 { grid-area: 4 / 1 / 5 / 3 }
    .conteudo.A5-B5 { grid-area: 5 / 1 / 6 / 3 }
    .conteudo.A6-B6 { grid-area: 6 / 1 / 7 / 3 }
    .conteudo.K3-L6 {
      grid-area: 3 / 11 / 7 / 13;
      justify-content: center;
    }
    .conteudo.A3-B3,
    .conteudo.A4-B4,
    .conteudo.A5-B5,
    .conteudo.A6-B6 {
      justify-content: unset
    }
  }
}

.tabelas-grid-container {
  display: grid;
  grid-template-columns: 2fr 3fr 1fr;
  grid-column-gap: 2rem;
  margin: 1rem;
  .block {
    margin-right: 0;
    margin-left: 0
  }
  @media (max-width: $desktop) {
    grid-template-columns: 1fr 1fr;
  }
  @media (max-width: $tablet) {
    grid-template-columns: 1fr;
  }
}

.estoque-limite {
  ul {
    display: grid;
    grid-template-columns: 3fr 1fr;
    grid-column-gap: 1rem;
    li { border-top: $line-1px }
    &.notas {
      display: flex;
      flex-direction: column;
      li {
        border: 0;
        padding: 0
      }
    }
  }
}

.convertido-desvinculado {
  .tabela {
    grid-template-columns: repeat(6, 1fr);
    grid-template-rows: repeat(2, 1fr);
    grid-column-gap: 1rem;
    .cabecalho, .conteudo { border-bottom: $line-1px }
    .cabecalho.A1-B2 { grid-area: 1 / 1 / 3 / 3 }
    .cabecalho.C1-D1 { grid-area: 1 / 3 / 2 / 5 }
    .cabecalho.E1-F1 { grid-area: 1 / 5 / 2 / 7 }
    .conteudo.A1-B1 { grid-area: 1 / 1 / 2 / 3 }
    .conteudo.A2-B2 { grid-area: 2 / 1 / 3 / 3 }
    .conteudo.A3-B3 { grid-area: 3 / 1 / 4 / 3 }
    .conteudo.A4-B4 { grid-area: 4 / 1 / 5 / 3 }
    .conteudo.A5-B5 { grid-area: 5 / 1 / 6 / 3 }
    .conteudo.A6-B6 { grid-area: 6 / 1 / 8 / 3 }
    .conteudo.C8-D8 {
      grid-area: 6 / 3 / 8 / 5;
      justify-content: center;
    }
    .conteudo.E8-F8 { grid-area: 6 / 5 / 8 / 6 }
    .conteudo.G8-H8 { grid-area: 6 / 6 / 8 / 7 }
    .conteudo.A1-B1,
    .conteudo.A2-B2,
    .conteudo.A3-B3,
    .conteudo.A4-B4,
    .conteudo.A5-B5,
    .conteudo.A6-B6 {
      justify-content: unset
    }
    .conteudo.destaque {
      margin-top: 5px;
      border-bottom: 0
    }
    &.header { border: 0 }
    &.main { grid-template-rows: repeat(7, 1fr) }
  }
}

.resumo {
  h3, .cabecalho, .conteudo { border-bottom: $line-1px }
  .tabela {
    grid-template-columns:  1fr 1fr;
    li {
      &.saldo {
        border-bottom: 0
      }
    }
  }
}
</style>
