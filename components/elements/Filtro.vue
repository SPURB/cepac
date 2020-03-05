<template>
  <div id="filter">
    <div class="btn-group">
      <button
        @click="onShowForm"
        type="button"
        class="btn btn-filtro"
      >
        <svg
          version="1.0"
          xmlns="http://www.w3.org/2000/svg"
          width="15px"
          height="15px"
          viewBox="0 0 1232.000000 1280.000000"
          preserveAspectRatio="xMidYMid meet"
        >
          <metadata>Created by potrace 1.15, written by Peter Selinger 2001-2017</metadata>
          <g
            transform="translate(0.000000,1280.000000) scale(0.100000,-0.100000)"
            fill="#FFFFFF"
            stroke="none"
          >
            <path
              d="M102 12678 c58 -68 1233 -1459 2613 -3093 1380 -1633 2542 -3009
            2582 -3056 l73 -86 0 -3221 0 -3221 790 792 790 792 0 2430 1 2430 1470 1740
            c1881 2225 2386 2823 3193 3780 362 429 670 792 684 808 l26 27 -6163 0 -6163
            0 104 -122z"
            />
          </g>
        </svg>
        Filtros
      </button>
      <button
        @click="resetFiltros"
        v-if="existQuery"
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
      <custom-select
        :key="index"
        :buildSelect="item"
        v-for="(item, index) in buildFiltros"
      />
      <div class="form-section">
        <button type="submit" class="btn btn-submit">
          Filtrar
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import CustomSelect from './CustomSelect'
export default {
  name: 'Filtro',
  components: {
    CustomSelect
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
      form: {
        situacao: '',
        ouc: ''
      },
      showForm: false
    }
  },
  computed: {
    existQuery () {
      if (Object.keys(this.$route.query).length > 0) {
        return true
      }
      return false
    }
  },
  methods: {
    onShowForm () {
      this.showForm = !this.showForm
    },
    search () {
      let url = '?'
      Object.values(this.form).map((item) => {
        if (item !== '') {
          url = url + `&${item}`
        }
      })
      url = url.replace('&', '') // remove a primeira instancia de & para não ocorrer erro na query
      window.location.assign(this.locationPath + url)
    },
    resetFiltros () {
      window.location.assign(this.locationPath)
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
    width: 100%;

    .form-section {
      &:last-child {
        align-self: center;
        padding-top: 36px;
        width: 10%;
      }
    }
  }
}
</style>
