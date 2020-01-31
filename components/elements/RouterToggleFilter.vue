<template>
  <div class="router-toggle-filter">
    <button @click.prevent="displayActions=!displayActions">
      Filtrar
    </button>
    <ul v-if="displayActions" class="router-toggle-filter__list">
      <li v-for="(btnAction, index) in btnActions" :key="index" class="list__item">
        <button @click.prevent="goto(btnAction.url)">
          {{ btnAction.name }}
        </button>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'RouterToggleFilter',
  props: {
    btnActions: {
      type: Array, // [{ name: 'nome do botão', url: 'http://url' }]
      required: true
    }
  },
  data () {
    return {
      displayActions: false
    }
  },
  methods: {
    goto (url) {
      window.location.assign(url)
    }
  }
}
</script>
<style lang="scss" scoped>
.router-toggle-filter,
.router-toggle-filter__list {
  display: flex
}

.list__item {
  margin-right: 1rem;
}
</style>
