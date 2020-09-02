<template>
  <div ref="index" class="index">
    <section class="index__landing landing">
      <global-events
        @keydown.enter="scrollTo('oucfl')"
        @keydown.esc="scrollTo('index', true)"
      />
      <logo-spurb :fill-type="'#fff'" :fill-brand="'#fff'" />
      <p class="index__caption">
        Documentos e dados dos CEPAC’s (Certificados de Potencial Adicional de Construção) mantidos pela São Paulo Urbanismo
      </p>
      <a @click.prevent="scrollTo('oucfl')" class="landing__controller">
        <seta :horizontal="true" />
      </a>
    </section>
    <section ref="oucfl" class="index__landing list">
      <cepac-navigator
        :mapa="1"
        nome="Faria Lima"
        titulo="Operação Urbana Consociada Faria Lima"
        subtitulo="Lei 13.769/04, alterada pelas leis 13.871, 15.519/11 e 16.242/15"
        slug="ouc-faria-lima"
      />
      <cepac-navigator
        :mapa="2"
        nome="Água Espraiada"
        titulo="Operação Urbana Consociada Água Espraiada"
        subtitulo="Lei 13.769/04, alterada pelas leis 13.871, 15.519/11 e 16.242/15"
        slug="ouc-agua-espraiada"
      />
      <cepac-navigator
        :mapa="3"
        nome="Centro"
        titulo="Operação Urbana Consociada Centro"
        subtitulo="Lei 13.769/04, alterada pelas leis 13.871, 15.519/11 e 16.242/15"
        slug="ouc-centro"
      />
    </section>
    <section class="footer">
      <footer-info />
    </section>
  </div>
</template>

<script>
import GlobalEvents from 'vue-global-events'
import smoothscroll from 'smoothscroll-polyfill'
import LogoSpurb from '~/components/icons/LogoSpurb'
import Seta from '~/components/icons/Seta'
import CepacNavigator from '~/components/sections/CepacNavigator'
import FooterInfo from '~/components/sections/FooterInfo'

smoothscroll.polyfill()

export default {
  name: 'Index',
  layout: 'home',
  components: {
    LogoSpurb,
    Seta,
    CepacNavigator,
    FooterInfo,
    GlobalEvents
  },
  methods: {
    scrollTo (ref, reset = false) {
      const elHeight = reset ? 0 : this.$refs[ref].clientHeight
      try {
        window.scrollTo({
          top: elHeight,
          left: 0,
          behavior: 'smooth'
        })
      }
      catch {
        throw new Error('Could not scroll')
      }
    }
  }
}

</script>
<style lang="scss" scoped>
@import '~/assets/variables';
.index {
  &__caption {
    max-width: 600px;
  }
}

.index__landing {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
}

.landing {
  height: 100vh;
  background-color: $brand-1;
  .logo {
    margin-top: auto
  }
  p {
    margin: 1.5rem 1rem auto;
    color: #ffffff;
    text-align: center;
  }
  a {
    height: 52px;
    margin: 0 auto;
    &:hover {
      cursor: pointer
    }
  }
}
.list {
  background-color: #fff;
}
</style>
