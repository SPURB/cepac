<template>
  <div class="router-toggle-filter">
    <button class="router-toggle-filter__btn" @click.prevent="displayActions=!displayActions">
      <span class="btn__icon" :class="{ 'btn__icon--open': displayActions }">&dtrif;</span>Filtros
    </button>
    <ul v-if="displayActions" class="router-toggle-filter__list">
      <li v-for="(btnAction, index) in btnActions" :key="index" class="list__item">
        <button class="item__btn" :class="{ active: btnAction.active }" @click.prevent="goto(btnAction.url)">
          {{ btnAction.name }}
        </button>
      </li>
    </ul>
    <button v-if="haveActives" @click.prevent="reset">
      <span class="btn__icon" :class="{ 'btn__icon--open': displayActions }">&cularr;</span>Limpar filtros
    </button>
  </div>
</template>
<script>
export default {
  name: 'RouterToggleFilter',
  props: {
    btnActions: {
      type: Array, // [{ name: 'nome do botão', url: 'http://url', active: true/false }]
      required: true
    }
  },
  data () {
    return {
      displayActions: false
    }
  },
  computed: {
    haveActives () {
      return this.btnActions
        .map(action => action.active)
        .includes(true)
    }
  },
  created () {
    if (this.haveActives) {
      this.displayActions = true
    }
  },
  methods: {
    goto (url) {
      window.location.assign(url)
    },
    reset () {
      const urlNoQueries = window.location.origin + window.location.pathname
      this.goto(urlNoQueries)
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
  &.active {
    background-color: #008375;
  }
  @media (max-width: $tablet) {
    width: 100%;
    margin-bottom: 1rem
  }
}

.btn__icon--open{
  transform: rotate(30deg)
}
</style>
