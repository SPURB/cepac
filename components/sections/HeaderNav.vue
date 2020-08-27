<template>
  <header class="header-nav">
    <router-link to="/">
      <logo-spurb :fill-type="'#1D1D1B'" :fill-brand="'#038375'" />
    </router-link>
    <p class="header-nav__page-title">
      {{ pageTitle }}
    </p>
    <nav class="nav-sections">
      <router-link class="nav-sections__item" to="/ouc-faria-lima" tag="a" name="ouc-faria-lima">
        Quadro geral
      </router-link>
      <router-link class="nav-sections__item" to="/ouc-faria-lima/resumo" tag="a" name="ouc-faria-lima-resumo">
        Resumo
      </router-link>
      <router-link class="nav-sections__item" to="/ouc-faria-lima/mapa/1" tag="a" name="ouc-faria-lima-mapa">
        Mapa
      </router-link>
    </nav>
  </header>
</template>
<script>
import { mapState } from 'vuex'
import LogoSpurb from '~/components/icons/LogoSpurb.vue'
export default {
  name: 'HeaderNav',
  components: { LogoSpurb },
  computed: {
    ...mapState('user-interface', [ 'pageTitle' ])
  }
}
</script>
<style lang="scss">
@import '~/assets/variables';

.header-nav {
  display: flex;
  justify-content: space-between;
  &__page-title {
    align-self: center;
    @media (max-width: $tablet) {
      display: none;
    }
  }
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
