<template>
  <div class="message-bar">
    {{ message }}
  </div>
</template>

<script>
export default {
  name: 'MessageBar',
  props: {
    message: {
      required: true,
      type: String
    }
  }
}
</script>

<style lang="scss" scoped>
.message-bar {
  padding: 1rem;
  text-align: center;
  background-color: #FFDAAD;
}
</style>
