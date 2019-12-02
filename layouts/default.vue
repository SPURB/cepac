<template>
  <div class="default">
    <header-nav />
    <nuxt />
  </div>
</template>
<script>
import HeaderNav from '~/components/sections/HeaderNav.vue'
export default {
  name: 'Default',
  components: {
    HeaderNav
  },
  head () {
    return {
      title: 'SP Urbanismo | Relatórios',
      meta: [{ hid: 'relatorios', name: 'relatorios', content: 'Relatórios da São Paulo Urbanismo' }]
    }
  }
}
</script>
