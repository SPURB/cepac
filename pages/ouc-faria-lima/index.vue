<template>
  <div class="index">
    <preloader :is-fething="true" />
    <page-title :two-columns="true">
      <div class="col-1">
        <h1>Operação Urbana Consociada Faria Lima</h1>
        <h2>Controle de Estoques</h2>
      </div>
      <div class="col-2">
        <p class="fonte">
          Fonte: <a href="https://servicos.spurbanismo.sp.gov.br/cepacs/api/fila" target="_blank">servicos.spurbanismo.sp.gov.br/cepacs/api/fila</a>
        </p>
      </div>
    </page-title>
    <index-table
      :table-name="addDateToName(tableName)"
      :query-filter="'?'"
      :build-filtros="[
        {
          title: 'Situação',
          values: [
            { title: 'Selecione uma situação', value: 0 },
            { title: 'Checklist', value: 'IdStatus=1' },
            { title: 'Em análise', value: 'IdStatus=2' },
            { title: 'Indeferidos', value: 'IdStatus=3' },
            { title: 'Aprovados', value: 'IdStatus=4' },
            { title: 'Cancelados', value: 'IdStatus=5' }
          ],
        },
        {
          title: 'Setor',
          values: [
            { title: 'Selecione um setor', value: 0 },
            { title: 'Hélio Pelegrino', value: 'IdSetor=1' },
            { title: 'Faria Lima', value: 'IdSetor=2' },
            { title: 'Pinheiros', value: 'IdSetor=3' },
            { title: 'Olimpíadas', value: 'IdSetor=4' }
          ]
        }
      ]
      "
    />
    <message-bar v-if="displayCanceladosMessage" :message="'Os itens CANCELADOS estão em processo de revisão'" />
  </div>
</template>
<script>
import PageTitle from '~/components/sections/PageTitle'
import IndexTable from '~/components/sections/IndexTable'
import Preloader from '~/components/sections/Preloader'
import MessageBar from '~/components/elements/MessageBar'

export default {
  name: 'OucFariaLima',
  components: {
    PageTitle,
    IndexTable,
    Preloader,
    MessageBar
  },
  data () {
    return {
      tableName: 'ouc-faria-lima'
    }
  },
  computed: {
    displayCanceladosMessage () {
      return this.$route.query.IdStatus === '5'
    }
  },
  methods: {
    addDateToName (name) {
      const date = new Date()
      const yyyy = date.getFullYear()
      const mm = date.getMonth()
      const dd = date.getDay()
      const ho = date.getHours()
      const mi = date.getMinutes()
      return `${name}_${yyyy}-${mm}-${dd}_${ho}h${mi}`
    }
  },
  head () {
    return {
      title: 'OUC Faria Lima | Estoques desvinculados',
      meta: [{ hid: 'relatorios', name: 'relatorios', content: "Operação Urbana Consorciada Faria Lima CEPAC'S desvinculados" }]
    }
  }
}
</script>
<style lang="scss">
@import '../../assets/variables';

.tabela {
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
</style>
