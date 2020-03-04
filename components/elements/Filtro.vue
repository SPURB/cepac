<template>
  <div id="filter">
    <form>
      <div class="form-section">
        Situação
        <select>
          <option :key="index" v-for="(item, index) in situacao" :value="item.value">
            {{item.name}}
          </option>
        </select>
      </div>
      <div class="form-section">
        OUC
      </div>
      <div class="form-section">
        Setor
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'filter',
  props: {
    situacao: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
#filter {
  width: 100%;
  height: 50px;

  form {
    width: 100%;
    display: flex;
    justify-content: space-around;
  }
}
</style>
