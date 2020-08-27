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
    ...mapState('userInterface', [ 'pageTitle' ])
  },
  created () {
    this.setHeader(this.$route.path)
  },
  methods: {
    ...mapMutations('user-interface', {
      uiSET: 'SET'
    }),
    setHeader (path) {
      if (path.includes('/ouc-faria-lima')) {
        this.uiSET({ key: 'pageTitle', data: 'OUC Faria Lima' })
      }
      else {
        this.uiSET({ key: 'pageTitle', data: 'CEPAC' })
      }
    }
  }
}
</script>
