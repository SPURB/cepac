<template>
  <div class="estoque-aca">
    <PageTitle :two-columns="true">
      <div class="col-1">
        <h1>Operação Urbana Consociada Faria Lima</h1>
        <h2>Lei 13.769/04, alterada pelas leis 13.871, 15.519/11 e 16.242/15</h2>
      </div>
      <div class="col-2">
        <p class="fonte">
          Fonte: <a href="https://servicos.spurbanismo.sp.gov.br/cepacs/api/estoque" target="_blank">servicos.spurbanismo.sp.gov.br/cepacs/api/estoque</a>
        </p>
      </div>
    </PageTitle>

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
          C3
        </li>
        <li class="conteudo">
          D3
        </li>
        <li class="conteudo">
          E3
        </li>
        <li class="conteudo">
          F3
        </li>
        <li class="conteudo">
          G3
        </li>
        <li class="conteudo">
          H3
        </li>
        <li class="conteudo">
          I3
        </li>
        <li class="conteudo">
          J3
        </li>
        <li class="conteudo A4-B4">
          Faria Lima
        </li>
        <li class="conteudo">
          C4
        </li>
        <li class="conteudo">
          D4
        </li>
        <li class="conteudo">
          E4
        </li>
        <li class="conteudo">
          F4
        </li>
        <li class="conteudo">
          G4
        </li>
        <li class="conteudo">
          H4
        </li>
        <li class="conteudo">
          I4
        </li>
        <li class="conteudo">
          J4
        </li>
        <li class="conteudo A5-B5">
          Pinheiros
        </li>
        <li class="conteudo">
          C5
        </li>
        <li class="conteudo">
          D5
        </li>
        <li class="conteudo">
          E5
        </li>
        <li class="conteudo">
          F5
        </li>
        <li class="conteudo">
          G5
        </li>
        <li class="conteudo">
          H5
        </li>
        <li class="conteudo">
          I5
        </li>
        <li class="conteudo">
          J5
        </li>
        <li class="conteudo A6-B6">
          Olimpíadas
        </li>
        <li class="conteudo">
          C6
        </li>
        <li class="conteudo">
          D6
        </li>
        <li class="conteudo">
          E6
        </li>
        <li class="conteudo">
          F6
        </li>
        <li class="conteudo">
          G6
        </li>
        <li class="conteudo">
          H6
        </li>
        <li class="conteudo">
          I6
        </li>
        <li class="conteudo">
          J6
        </li>
        <li class="conteudo K3-L6">
          292.445,00
        </li>
      </ul>
      <ul class="notas">
        <li class="nota">
          (*) Saldo com base no limite de estoque líquido disponibilizado pelo Artigo 6º e Tabela 2 da Lei 13.769/04
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from '~/plugins/axios'
import PageTitle from '~/components/sections/PageTitle'

export default {
  name: 'ControleEstoquesAca',
  components: {
    PageTitle
  },
  data () {
    return {
      estoque: [],
      mapSetores: {
        '1': 'Hélio Pelegrino',
        '2': 'Faria Lima',
        '3': 'Pinheiros',
        '4': 'Olimpíadas'
      }
    }
  },
  asyncData: ({ params }) => {
    return axios.get(`/estoque/`)
      .then((res) => { return { estoque: res.data } })
      .catch((e) => { return { error: e } })
  },

  created () {
    console.log(this.estoque)
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
$line-1px: solid #E0E0E0 1px;

ol, ul, li {
  list-style: none;
  margin: 0;
  padding: 0;
  border: 0
}

.block {
  margin: 1rem;
  border-top: solid #4F4F4F 10px;
  border-bottom: solid #4F4F4F 5px;
  h3 {
    border-bottom: $line-1px;
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
      justify-content: end;
    }
  }
}

.estoques-aca {
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
      font-weight: 700;
      background-color: #F5F5F5
    }
    .conteudo.A3-B3,
    .conteudo.A4-B4,
    .conteudo.A5-B5,
    .conteudo.A6-B6 {
      justify-content: unset
    }
  }
}
</style>
