<template>
  <div class="cepac-navigator">
    <section class="list__info">
      <div class="list__info--header">
        <h3>{{ titulo }}</h3>
        <h4>{{ subtitulo }}</h4>
      </div>

      <a @click.prevent="changeShow" style="cursor: pointer;">
        <seta :is-open="isShow" />
      </a>
    </section>
    <ul v-if="isShow" class="list__list">
      <li class="list__item">
        <router-link :to="`/${slug}/resumo`" :name="slug" tag="a" class="list__item__wrapper-link">
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
        <router-link :to="`/${slug}`" :name="slug" tag="a" class="list__item__wrapper-link">
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
          <router-link
            :to="{ path: `/${slug}`, query: { IdStatus: 4 }, tag: 'li'}"
            class="subitems__list__item"
          >
            Consumido
          </router-link>
          <router-link
            :to="{ path: `/${slug}`, query: { IdStatus: 2 }, tag: 'li'}"
            class="subitems__list__item"
          >
            Análise
          </router-link>
          <router-link
            :to="{ path: `/${slug}`, query: { IdStatus: 1 }, tag: 'li'}"
            class="subitems__list__item"
          >
            Checklist
          </router-link>
          <router-link
            :to="{ path: `/${slug}`, query: { IdStatus: 3 }, tag: 'li'}"
            class="subitems__list__item"
          >
            Indeferidos
          </router-link>
        </ul>
      </li>

      <li class="list__item subitems">
        <router-link :to="`/${slug}/mapa/${mapa}`" :name="slug" tag="a" class="list__item__wrapper-link">
          <h3>Mapa dos cadastros da OUCFL</h3>
          <div
            v-observe-visibility="{
              callback: visibilityChanged
            }"
            :class="{ visible: displayThirdImg }"
            class="third"
          >
            <img
              v-if="thirdImageIsVisible"
              @load="isLoaded('third')"
              class="item__preview"
              srcset="
                ~/assets/images/map-sample_thumb.jpg 40w,
                ~/assets/images/map-sample_medium.jpg 200w,
                ~/assets/images/map-sample_big.jpg 528w"
              src="~/assets/images/map-sample_big.jpg"
            >
            <img
              v-else
              class="item__placeholder"
              src="~/assets/images/map-sample_thumb.jpg"
            >
            <seta :rotate="true" />
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Seta from '~/components/icons/Seta'

export default {
  name: 'CepacNavigator',
  components: {
    Seta
  },
  props: {
    nome: {
      type: String,
      required: true
    },
    titulo: {
      type: String,
      required: true
    },
    subtitulo: {
      type: String,
      required: true
    },
    slug: {
      type: String,
      required: true
    },
    mapa: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      firstImageIsVisible: false,
      secondImageIsVisible: false,
      firstImageIsLoaded: false,
      secondImageIsLoaded: false,
      thirdImageIsVisible: false,
      thirdImageIsLoaded: false,
      isShow: false
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
    },
    displayThirdImg () {
      return this.thirdImageIsVisible && this.thirdImageIsLoaded
    }
  },
  methods: {
    ...mapActions('user-interface', ['setOUC']),
    changeShow () {
      this.isShow = !this.isShow
      if (this.isShow) {
        this.setOUC({
          nome: this.nome,
          titulo: this.titulo,
          subtitulo: this.subtitulo,
          slug: this.slug,
          mapa: this.mapa
        })
      }
      else {
        this.setOUC({})
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
      else if (entry.target.className === 'third') this.thirdImageIsVisible = isVisible
    },
    isLoaded (imgItem) {
      if (imgItem === 'first') this.firstImageIsLoaded = true
      else if (imgItem === 'second') this.secondImageIsLoaded = true
      else if (imgItem === 'third') this.thirdImageIsLoaded = true
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/variables';
.cepac-navigator {
  width: 100%;
}

.list__info, .list__list {
  width: 100%;
}

.list__info {
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &--header {
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
