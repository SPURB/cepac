<template>
  <div class="">
    <modal
      v-if="modal.show"
      :title="modal.title"
      :error="modal.error"
      :description="modal.description"
      :action-description="modal.actionDescription"
      :action-text="modal.actionText"
      @setModalAction="getEmitModal"
    />

    <header class="header-nav">
      <router-link to="/">
        <logo-spurb :fill-type="'#1D1D1B'" :fill-brand="'#038375'" />
      </router-link>
      <p class="header-nav__page-title">
        {{ pageTitle }}
      </p>
      <nav class="nav-sections">
        <router-link :to="`/${ouc.slug}`" :name="ouc.slug" tag="a" class="nav-sections__item">
          Quadro geral
        </router-link>
        <router-link :to="`/${ouc.slug}/resumo`" :name="ouc.slug" tag="a" class="nav-sections__item">
          Resumo
        </router-link>
        <router-link :to="`/${ouc.slug}/mapa/${ouc.mapa}`" :name="ouc.slug" tag="a" class="nav-sections__item">
          Mapa
        </router-link>
      </nav>
    </header>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import LogoSpurb from '~/components/icons/LogoSpurb.vue'
import Modal from '~/components/elements/Modal'

export default {
  name: 'HeaderNav',
  components: { LogoSpurb, Modal },
  data () {
    return {
      modal: {
        show: false,
        error: false,
        title: '',
        description: '',
        actionDescription: '',
        actionText: ''
      }
    }
  },
  computed: {
    ...mapState('user-interface', ['pageTitle', 'ouc'])
  },
  beforeMount () {
    if (Object.keys(this.ouc).length > 0) {
      this.modal.error = false
      this.modal.title = ''
      this.modal.description = ''
      this.modal.actionDescription = ''
      this.modal.actionText = ''
      this.modal.show = false
    }
    else {
      this.modal.error = true
      this.modal.title = 'Erro.'
      this.modal.description = 'Acesso direto pela URL negado!'
      this.modal.actionDescription = 'Volte a página principal e selecione a Operação urbana'
      this.modal.actionText = 'Voltar para página principal.'
      this.modal.show = true
    }
  },
  methods: {
    getEmitModal () {
      this.$router.push({ path: '/' })
    }
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
