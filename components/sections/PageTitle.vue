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
}

.two-columns {
  grid-template-columns: repeat(2, 1fr);
  .col-2 {
    display: flex;
    align-items: center;
    justify-content: flex-end;
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
    text-decoration: none
  }
}

</style>
