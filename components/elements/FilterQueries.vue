<template>
  <div id="filter">
    <div class="btn-group">
      <button
        @click="onShowForm"
        type="button"
        class="btn btn-filtro"
      >
        <filtro />
        Filtros
      </button>
      <button
        v-if="existQuery"
        @click="resetFiltros"
        type="button"
        class="btn btn-filtro"
      >
        &cularr; Limpar filtros
      </button>
    </div>
    <form
      id="form"
      :style="`display: ${ showForm ? 'flex' : 'none' && existQuery ? 'flex' : 'none'}`"
      @submit.prevent="search"
    >
      <div class="select-generator">
        <custom-select
          v-for="(item, index) in buildFiltros"
          :key="index"
          :options="item"
          :ref="`dropdown-${index}`"
          @optionValue="getValueOption"
        />
        <div class="form-section">
          <button type="submit" class="btn btn-submit">
            Filtrar
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import CustomSelect from '~/components/elements/CustomSelect'
import Filtro from '~/components/icons/Filtro'

export default {
  name: 'FilterQueries',
  components: {
    CustomSelect,
    Filtro
  },
  props: {
    buildFiltros: {
      type: Array,
      required: true
    },
    locationPath: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      form: {},
      showForm: false
    }
  },
  computed: {
    existQuery () {
      if (Object.keys(this.$route.query).length > 0) {
        return true
      }
      return false
    },
    idStatus () {
      if (this.$route.query.IdStatus) {
        return `IdStatus=${this.$route.query.IdStatus}`
      }
      return 0
    },
    idSetor () {
      if (this.$route.query.IdSetor) {
        return `IdSetor=${this.$route.query.IdSetor}`
      }
      return 0
    },
    joinFiltros () {
      return [this.idStatus, this.idSetor]
    }
  },
  mounted () {
    this.selectField()
  },
  methods: {
    onShowForm () {
      this.showForm = !this.showForm
    },
    getValueOption (optionValue) {
      optionValue = optionValue.split('=')
      this.form[`${optionValue[0]}`] = optionValue[1]
    },
    search () {
      let url = '?'
      Object.keys(this.form).map((key, index) => {
        const value = this.form[key]
        if (value !== '') {
          url = url + `&${key}=${value}`
        }
      })
      url = url.replace('&', '') // remove a primeira instancia de & para não ocorrer erro na query
      window.location.assign(this.locationPath + url)
    },
    resetFiltros () {
      window.location.assign(this.locationPath)
    },
    selectField () {
      for (const i in this.buildFiltros) {
        const select =
          this.$refs[`dropdown-${i}`][0].$el
            .children[1]
            .children[0]
        const filtroValue = this.buildFiltros[i].values.filter(v => v.value === this.joinFiltros[i])
        select.textContent = filtroValue[0].title
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/variables";
#filter {
  background-color: $brand-2;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding-top: 25px;

  .btn-group {
    display: flex;
    justify-content: flex-end;
    width: 100%;
  }
  .btn {
    border: none;
    border-radius: 5px;
    background-color: #0a5950;
    color: #fff;
    cursor: pointer;
    font-size: 13pt;
    height: 50px;
    padding: 13px;
    margin: 0px 15px 15px 0px;

    &:hover {
      background-color: $brand-1;
    }
  }

  .btn-filtro {
    align-items: center;
    align-self: flex-end;
    display: flex;
    justify-content: space-evenly;
  }

  .btn-submit {
    margin: 0;
    width: 100%;
  }

  form {
    display: none;
    padding-left: 30px;
    width: 100%;

    .select-generator {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 10px;
      margin-right: 30px;
      width: 100%;
      /**
        Limpando conflitos com o button-submit
       */
      .form-section {
        padding-top: 0;
        width: 100%;

        &:last-child {
          align-self: flex-end;
          padding-top: 0;
          width: 100%;

          button {
            max-width: 22%;
            height: 48px;
            margin: 10px;
          }
        }
      }
    }
  }
}
@media (max-width: $tablet) {
  .select-generator {
    grid-template-columns: repeat(1, 1fr) !important;
    .form-section {
      width: 100% !important;

      &:last-child {
        display: flex;
        justify-content: flex-end;
      }
    }
  }
}
</style>
