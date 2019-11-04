<template>
  <div class="index">
    <div class="container">
      <div class="icon">
        <oficio :fill="'#038375'" />
      </div>
      <h2>Relatórios da São Paulo Urbanismo</h2>
    </div>
    <nav id="routes">
      <h3>Relatórios</h3>
      <ul v-if="routes.length" class="report__list">
        <li v-for="(route, index) in routes" :key="index" class="list__item">
          <nuxt-link :to="route.path">
            {{ route.name }}
          </nuxt-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import Oficio from '~/components/icons/Oficio.vue'
export default {
  name: 'index',
  components: {
    Oficio
  },
  data () {
    return {
      routes: [] // todas as rotas menos a atual (criado em created)
    }
  },
  head () {
    return {
      title: 'SP Urbanismo | Relatórios',
      meta: [{ hid: 'relatorios', name: 'relatorios', content: 'Relatórios da São Paulo Urbanismo' }]
    }
  },
  created () {
    this.routes = this.listRoutes(this.$router.options.routes, this.$options.name)
  },
  methods: {
    listRoutes: (routes, componentName) => routes
      .filter(route => componentName !== route.name)
  }
}
</script>
<style lang="scss" scoped>
.container { min-height: 90vh }
nav#routes {
  display: flex;
  flex-direction: column;
  text-align: center;
}
</style>
