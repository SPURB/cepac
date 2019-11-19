<template>
  <section class="page-title" :class="{ 'two-columns': twoColumns }">
    <slot />
  </section>
</template>

<script>
export default {
  name: 'PageTitle',
  props: {
    twoColumns: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/variables';

.page-title {
  color: #FFF;
  background-color: $brand-1;
  padding: 1.75rem 1rem;
  display: grid;
  @media (max-width: $tablet) {
    h1 {
      font-size: 1rem
    }
    h2 {
      font-size: small
    }
  }
  @media print { display: none }
}

.two-columns {
  grid-template-columns: repeat(2, 1fr);
  .col-2 {
    display: flex;
    text-align: right;
    justify-content: flex-end;
    flex-direction: column
  }
  @media (max-width: $desktop) {
    grid-template-columns: 1fr;
    .col-2 {
      margin-top: 1rem;
      text-align: left;
    }
  }
}

h1 {
  font-size: 1.5rem;
}

h2 {
  font-size: 1.2rem;
  font-weight: 400
}

.fonte {
  a {
    color: white;
    text-decoration: none;
    &:hover {
      cursor: pointer
    }
  }
}

</style>
