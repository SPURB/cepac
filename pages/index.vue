<template>
  <div class="index">
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
export default {
  name: 'Index',
  data () {
    return {
      routes: [] // todas as rotas menos exclusões de listRoutes
    }
  },
  created () {
    this.routes = this.listRoutes(this.$router.options.routes, ['index', 'ouc-faria-lima-id'])// excluir index e dependentes de :id
  },
  methods: {
    listRoutes: (routes, excludedRoutes) => routes.filter(route => !excludedRoutes.includes(route.name))
  }
}
</script>
<style lang="scss" scoped>
.index{
  margin: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

#routes {
  display: flex;
  flex-direction: column;
  text-align: left;
}
</style>
