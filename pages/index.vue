<template>
  <div class="container">
    <div class="icon">
      <oficio :fill="'#038375'" />
    </div>
    <h2>
      Relatórios da São Paulo Urbanismo
    </h2>
  </div>
</template>

<script>
import Oficio from '~/components/icons/Oficio.vue'
export default {
  components: {
    Oficio
  },
  head () {
    return {
      title: 'SP Urbanismo | Relatórios',
      meta: [{ hid: 'relatorios', name: 'relatorios', content: 'Relatórios da São Paulo Urbanismo' }]
    }
  }
}
</script>
<style lang="scss">
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  .icon {
    max-width: 60px;
    max-height: 60px;
  }
}
</style>
