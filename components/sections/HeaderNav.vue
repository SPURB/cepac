<template>
  <header class="header-nav">
    <router-link to="/">
      <logo-spurb :fill-type="'#1D1D1B'" :fill-brand="'#038375'" />
    </router-link>
    <nav class="nav-sections">
      <router-link class="nav-sections__item" to="/ouc-faria-lima" tag="a" name="ouc-faria-lima">
        Quadro Geral OUCFL
      </router-link>
      <router-link class="nav-sections__item" to="/ouc-faria-lima/controle-de-estoques-aca" tag="a" name="ouc-faria-lima-controle-de-estoques-aca">
        Resumo OUCFL
      </router-link>
    </nav>
  </header>
</template>
<script>
import LogoSpurb from '~/components/icons/LogoSpurb.vue'
export default {
  name: 'HeaderNav',
  components: { LogoSpurb }
}
</script>
<style lang="scss">
@import '~/assets/variables';

.header-nav {
  display: flex;
  justify-content: space-between;
  @media (max-width: $tablet) {
    flex-direction: column;
    align-items: center
  }
  .logo {
    width: 151px;
    margin-left: 22px;
    @media (max-width: $tablet) {
      display: none;
    }
  }
}
.nav-sections {
  display: flex;
  align-items: center;
  margin-right: 1rem;
}
.nav-sections__item {
  color: inherit;
  opacity: 0.6;
  margin: 1rem 0 1rem 1rem;
  padding-top: 0.3rem;
  border-top:  3px solid #FFF;
  transition: ease 0.25s all;
  &:hover {
    border-top-color: $brand-1;
    opacity: 1;
  }
  &.nuxt-link-exact-active {
    border-top-color: $brand-2
  }
}
</style>
