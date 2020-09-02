<template>
  <div class="default">
    <header-nav />
    <nuxt />
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import HeaderNav from '~/components/sections/HeaderNav.vue'
export default {
  name: 'Default',
  components: { HeaderNav },
  head () {
    return {
      title: 'SP Urbanismo | Relatórios',
      meta: [{ hid: 'relatorios', name: 'relatorios', content: 'Relatórios da São Paulo Urbanismo' }]
    }
  },
  computed: {
    ...mapState('user-interface', ['pageTitle', 'ouc'])
  },
  created () {
    this.setHeader()
  },
  methods: {
    ...mapMutations('user-interface', {
      uiSET: 'SET'
    }),
    setHeader () {
      this.uiSET({ key: 'pageTitle', data: `OUC ${this.ouc.nome}` })
    }
  }
}
</script>
