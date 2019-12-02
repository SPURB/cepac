<template>
  <header>
    <router-link to="/">
      <logo-spurb :fill-type="'#1D1D1B'" :fill-brand="'#038375'" />
    </router-link>
  </header>
</template>
<script>
import LogoSpurb from '~/components/icons/LogoSpurb.vue'
export default {
  name: 'HeaderNav',
  components: { LogoSpurb }
}
</script>
<style lang="scss" scoped>
header {
  .logo {
    width: 151px;
    margin-left: 22px
  }
}
</style>
