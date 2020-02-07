<template>
  <div class="router-toggle-filter">
    <button class="router-toggle-filter__btn" @click.prevent="displayActions=!displayActions">
      Filtrar
    </button>
    <ul v-if="displayActions" class="router-toggle-filter__list">
      <li v-for="(btnAction, index) in btnActions" :key="index" class="list__item">
        <button class="item__btn" @click.prevent="goto(btnAction.url)">
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
@import '~/assets/variables';

.router-toggle-filter,
.router-toggle-filter__list {
  display: flex;
  @media (max-width: $tablet) {
    flex-direction: column;
  }
}

button {
  @media (max-width: $tablet) {
    margin-bottom: 0.1rem
  }
}

.router-toggle-filter__btn {
  @media (max-width: $tablet) {
    margin-right: 0;
  }
}

.list__item {
  margin-right: 1rem;
  @media (max-width: $tablet) {
    margin-right: 0;
  }
}

.item__btn {
  @media (max-width: $tablet) {
    width: 100%;
    margin-bottom: 1rem
  }
}
</style>
