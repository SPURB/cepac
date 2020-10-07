<template>
  <button
    @click.prevent="toggle(state)"
    :name="name"
    :class="{
      'button-section-toggler--open': state
    }"
    class="button-section-toggler"
  >
    <seta :class="{ 'button-section-toggler__seta--open': state }" class="button-section-toggler__seta" />
  </button>
</template>
<script>
export default {
  name: 'ButtonSectionToggler',
  props: {
    state: {
      type: Boolean,
      default: false
    },
    name: {
      type: String,
      default: 'Altere a seção'
    }
  },
  methods: {
    toggle (state) {
      this.$emit('ButtonSectionTogglerAction', !state)
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/assets/variables.scss';

.button-section-toggler {
  text-align: right;
  flex-direction: row;
  width: 100%;
  height: 30px;
  margin: 0;
  cursor: pointer;
  background-color: $brand-2;
  opacity: 0.8;
  border: 0;
  transition: all ease-in-out 300ms;
  &__seta {
    margin-top: 0.25rem;
    max-height: 13px;
    width: auto;
    transition: all ease-in-out 300ms;
    transition-delay: 100ms;
    &--open {
      margin-top: 0;
      transform: rotate(180deg);
    }
  }
  &:hover {
    opacity: 1;
  }
  @media (max-width: $tablet) {
    text-align: center;
    height: 50px;
    opacity: 1;
    &__seta {
      max-height: 18px;
    }
  }
}
</style>
