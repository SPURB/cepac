<template>
  <div ref="index" class="index">
    <section class="index__landing landing">
      <global-events
        @keydown.enter="scrollTo('oucfl')"
        @keydown.esc="scrollTo('index', true)"
      />
      <logo-spurb :fill-type="'#fff'" :fill-brand="'#fff'" />
      <p>Documentos e dados públicos mantidos pela São Paulo Urbanismo</p>
      <a @click.prevent="scrollTo('oucfl')" class="landing__controller">
        <seta :horizontal="true" />
      </a>
    </section>
    <section ref="oucfl" class="index__landing list">
      <div class="list__info">
        <h3>Operação Urbana Consociada Faria Lima</h3>
        <h4>Lei 13.769/04, alterada pelas leis 13.871, 15.519/11 e 16.242/15</h4>
      </div>
      <ul class="list__list">
        <li class="list__item">
          <router-link tag="a" to="/ouc-faria-lima/controle-de-estoques-aca" class="list__item__wrapper-link">
            <h3>Resumo de CEPAC’s da OUCFL</h3>
            <div
              v-observe-visibility="{
                callback: visibilityChanged
              }"
              :class="{ visible: displayFirstImg }"
              class="first"
            >
              <img
                v-if="firstImageIsVisible"
                @load="isLoaded('first')"
                class="item__preview"
                srcset="
                  ~/assets/images/report-sample_thumb.jpg 40w,
                  ~/assets/images/report-sample_medium.jpg 200w,
                  ~/assets/images/report-sample_big.jpg 528w"
                src="~/assets/images/report-sample_big.jpg"
              >
              <img
                v-else
                class="item__placeholder"
                src="~/assets/images/report-sample_thumb.jpg"
              >
              <seta :rotate="true" />
            </div>
          </router-link>
        </li>

        <li class="list__item subitems">
          <router-link tag="a" to="/ouc-faria-lima" name="ouc-faria-lima" class="list__item__wrapper-link">
            <h3>Quadro geral de controle de estoque</h3>
            <div
              v-observe-visibility="{
                callback: visibilityChanged
              }"
              :class="{ visible: displaySecondImg }"
              class="second"
            >
              <img
                v-if="secondImageIsVisible"
                @load="isLoaded('second')"
                class="item__preview"
                srcset="
                  ~/assets/images/index-sample_thumb.jpg 40w,
                  ~/assets/images/index-sample_medium.jpg 200w,
                  ~/assets/images/index-sample_big.jpg 528w"
                src="~/assets/images/index-sample_big.jpg"
              >
              <img
                v-else
                class="item__placeholder"
                src="~/assets/images/index-sample_thumb.jpg"
              >
              <seta :rotate="true" />
            </div>
          </router-link>
          <ul class="subitems__list">
            <router-link :to="{ path: '/ouc-faria-lima', name: 'ouc-faria-lima', query: { IdStatus: 4 }, tag: 'li'}" class="subitems__list__item">
              Consumido
            </router-link>
            <router-link :to="{ path: '/ouc-faria-lima', name: 'ouc-faria-lima', query: { IdStatus: 2 }, tag: 'li'}" class="subitems__list__item">
              Análise
            </router-link>
            <router-link :to="{ path: '/ouc-faria-lima', name: 'ouc-faria-lima', query: { IdStatus: 1 }, tag: 'li'}" class="subitems__list__item">
              Checklist
            </router-link>
            <router-link :to="{ path: '/ouc-faria-lima', name: 'ouc-faria-lima', query: { IdStatus: 3 }, tag: 'li'}" class="subitems__list__item">
              Indeferidos
            </router-link>
          </ul>
        </li>
      </ul>
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
import FooterInfo from '~/components/sections/FooterInfo'

smoothscroll.polyfill()

export default {
  name: 'Index',
  layout: 'home',
  components: {
    LogoSpurb,
    Seta,
    FooterInfo,
    GlobalEvents
  },
  data () {
    return {
      firstImageIsVisible: false,
      secondImageIsVisible: false,
      firstImageIsLoaded: false,
      secondImageIsLoaded: false
    }
  },
  computed: {
    section () {
      return this.$route.query.section
    },
    displayFirstImg () {
      return this.firstImageIsVisible && this.firstImageIsLoaded
    },
    displaySecondImg () {
      return this.secondImageIsVisible && this.secondImageIsLoaded
    }
  },
  mounted () {
    if (this.checkSectionsIsInRefs(this.$refs, this.$route.query)) this.scrollTo(this.$route.query.section)
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
    },
    checkSectionsIsInRefs (refs, query) {
      const sections = Object.keys(refs)
      const section = query.section
      return sections.includes(section)
    },
    visibilityChanged (isVisible, entry) {
      if (entry.target.className === 'first') this.firstImageIsVisible = isVisible
      else if (entry.target.className === 'second') this.secondImageIsVisible = isVisible
    },
    isLoaded (imgItem) {
      if (imgItem === 'first') this.firstImageIsLoaded = true
      else if (imgItem === 'second') this.secondImageIsLoaded = true
    }
  }
}

</script>
<style lang="scss" scoped>
@import '~/assets/variables';
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
  min-height: 100vh;
  background-color: #fff;
}

.list__info, .list__list {
  width: 100%;
}

.list__info {
  padding: 1rem;
  text-align: center;
  h3 {
    font-size: 2.5rem;
    color: $brand-1;
    font-weight: 700;
  }
  @media (max-width: $tablet) {
    h3 {
      font-size: 1.5rem;
      line-height: 1.5
    }
  }
}

.list__list {
  flex-grow : 1;
  .list__item:nth-child(odd) {
    background-color: #5CD6C9
  }
  .list__item:nth-child(even) {
    background-color: $brand-1
  }
}

.list__item {
  display: flex;
  align-items: center;
  padding: 1rem 0 1rem 1rem;
  h3 {
    font-weight: 700;
    font-size: 1.5rem;
    text-align: center;
    color: #fff;
    @media (max-width: $tablet) {
      font-size: 1rem
    }
  }
  &.subitems {
    flex-direction: column
  }
}

.list__item__wrapper-link {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-grow: 1;
  color: #000000;
  width: 100%;
  @supports(display: grid) {
    display: grid;
    grid-template-columns: 1fr 2fr;
    grid-gap: 0.5rem;
  }
  div {
    display: flex;
    align-items: center;
    padding-top: 1rem;
    filter: blur(8px);
    img {
      max-width: 528px;
      margin-left: auto;
      box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.25);
      transition: all ease 200ms;
      &:hover{
        transition: all ease 200ms;
        transform: translate(3px, -3px);
        box-shadow: 7px 7px 11px rgba(0, 0, 0, 0.25);
      }
    }
  }
  .visible {
      transition: filter ease-in-out 700ms;
      transition-delay: 500ms;
      filter: blur(0);
  }
}

.subitems__list {
  flex-shrink: 1;
  flex-wrap: wrap;
  display: flex;
  margin: 3rem 0 2rem;
  width: calc(100% - 1rem);
}

.subitems__list__item {
  flex-grow: 1;
  background: #0A5950;
  padding: 1rem;
  margin-right: 1rem;
  border-radius: 5px;
  color: #fff;
  text-align: center;
  transition: background 150ms ease-in-out;
  border: 1px solid #008375;
  &:hover {
    background: #008375;
    border: 1px solid #fff
  }
  @media (max-width: $tablet) {
    width: 100%;
    margin-bottom: 1rem;
  }

}
</style>
