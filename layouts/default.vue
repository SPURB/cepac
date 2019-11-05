<template>
  <div class="default">
    <header>
      <logo :fill-type="'#1D1D1B'" :fill-brand="'#038375'" />
    </header>
    <nuxt />
  </div>
</template>
<script>
import Logo from '~/components/icons/Logo.vue'
export default {
  name: 'Default',
  components: {
    Logo
  }
}
</script>
<style lang="scss">
.default {
  header {
    .logo {
      width: 151px;
      margin-left: 22px
    }
  }
}
</style>
