<template>
  <div class="index">
    <section class="index__landing landing">
      <logo-spurb :fill-type="'#fff'" :fill-brand="'#fff'" />
      <p>Documentos com dados atualizados e distribuídos em API’s públicas mantidos pela São Paulo Urbanismo</p>
      <a class="landing__controller" @click.prevent="scrollTo('list')">
        <seta />
      </a>
    </section>
    <section ref="list" class="index__landing list">
      <div class="list__info">
        <h3>Operação Urbana Consociada Faria Lima</h3>
        <h4>Lei 13.769/04, alterada pelas leis 13.871, 15.519/11 e 16.242/15</h4>
      </div>
      <ul class="list__list">
        <li>
          <router-link tag="a" to="/ouc-faria-lima">
            <h3>Quadro geral de controle de estoque</h3>
            <div>
              <img srcset="~/assets/images/index-sample_thumb.jpg 40w, ~/assets/images/index-sample_medium.jpg 200w, ~/assets/images/index-sample_big.jpg 528w" src="~/assets/images/index-sample_big.jpg">
              <seta :rotate="true" />
            </div>
          </router-link>
        </li>
        <li>
          <router-link tag="a" to="/ouc-faria-lima/controle-de-estoques-aca">
            <h3>Resumo de CEPAC’s da OUCFL</h3>
            <div>
              <img srcset="~/assets/images/report-sample_thumb.jpg 40w, ~/assets/images/report-sample_medium.jpg 200w, ~/assets/images/report-sample_big.jpg 528w" src="~/assets/images/report-sample_big.jpg">
              <seta :rotate="true" />
            </div>
          </router-link>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
import LogoSpurb from '~/components/icons/LogoSpurb'
import Seta from '~/components/icons/Seta'

export default {
  name: 'Index',
  layout: 'home',
  components: {
    LogoSpurb,
    Seta
  },
  methods: {
    scrollTo (ref) {
      const elHeight = this.$refs[ref].clientHeight
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
.index__landing {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100vh;
  flex-direction: column;
}

.landing {
  line-height: 4;
  background-color: $brand-1;
  .logo {
    margin-top: auto
  }
  p {
    color: #ffffff;
    margin-bottom: auto
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

.list__info, .list__list {
  width: 100%;
}

.list__info {
  padding: 1rem;
  h3 {
    font-size: 2.5rem;
    color: $brand-1;
    font-weight: 700
  }
}

.list__list {
  flex-grow : 1;
  li {
    display: flex;
    align-items: center;
    padding: 1rem 0 1rem 1rem;
    h3 {
      font-weight: 700;
    }
    a {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      flex-grow: 1;
      color: #000000;
      div {
        display: flex;
        align-items: center;
        img {
          max-width: 528px;
        }
      }
    }
  }
  li:nth-child(odd) {
    // height: 50%;
    background-color: #5CD6C9
  }
  li:nth-child(even) {
    // height: 50%;
    background-color: #FFDAAD
  }
}
</style>
