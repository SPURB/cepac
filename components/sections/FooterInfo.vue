<template>
  <div class="footer__info">
    <p>Caso surjam dúvidas ou problemas técnicos, envie um e-mail para <a class="info__email" href="mailto:desenvolvimento@spurbanismo.sp.gov.br?subject=Relatórios%20São%20Paulo%20Urbanismo">desenvolvimento@spurbanismo.sp.gov.br</a></p>
    <a class="info__icon" href="https://github.com/spurb/relatorios"><github /></a>
  </div>
</template>
<script>
import Github from '~/components/icons/Github'
export default {
  name: 'FooterInfo',
  components: {
    Github
  }
}
</script>
<style lang="scss" scoped>
@import '~/assets/variables';
.footer__info {
  background-color: $brand-2;
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  align-items: center;
  color: #fff;
  @media(max-width: $tablet) {
    flex-direction: column;
    text-align: center;
  }
}

.info__email {
  padding-bottom: 1rem;
  text-decoration: none;
  background-color: #0A5950;
  color: white;
  text-decoration: none;
  padding: 0.35rem 0.5rem;
  border-radius: 3px;
  @media(max-width: $tablet) {
    padding: 0.15rem
  }
}

.info__icon {
  @media(max-width: $tablet) {
    margin-top: 1.5rem
  }
}
</style>
