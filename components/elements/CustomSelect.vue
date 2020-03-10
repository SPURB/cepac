<template>
  <div class="form-section">
    <div class="title-select">
      {{ buildSelect.title }}
    </div>
    <div class="custom-select">
      <select
        v-model="optionValue"
        @change="emitValue"
      >
        <option value="" selected disabled>
          Selecione uma opção
        </option>
        <option
          v-for="(item, index) in buildSelect.values"
          :key="item.name+index"
          :value="item.value"
        >
          {{ item.name }}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CustomSelect',
  props: {
    buildSelect: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      optionValue: ''
    }
  },
  methods: {
    emitValue () {
      this.$emit('optionValue', this.optionValue)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/variables";
.form-section {
  display: flex;
  flex-direction: column;
  width: 33%;

  .title-select {
    color: #fff;
    font-size: 17pt;
    float: rigth;
  }

  .custom-select {
    position: relative;
    display: block;
    margin: 0 auto;
    background-color: $brand-1;
    z-index: 1;
    border-radius: 5px;
    width: 100%;

    select {
      appearance: none;
      border: none;
      background: transparent;
      font-size: 14px;
      color: #fff;
      cursor: pointer;
      display: block;
      outline: none;
      border-radius: 0;
      margin: 0;
      width: 100%;
      padding: 12px 55px 15px 15px;
      -webkit-appearance: none;
      -moz-appearance: none;

      option {
        box-sizing: inherit;
        background-color: $brand-1;
        cursor: pointer;
        font-size: 14px;
      }
    }

    &:after {
      border-left: 1px solid #fff;
      color: #fff;
      content: "\2228";
      font-size: 15px;
      position: absolute;
      line-height: 38px;
      text-align: center;
      top: 0;
      right: 0;
      width: 30px;
      height: 100%;
      z-index: -1;
    }
  }
}
</style>
