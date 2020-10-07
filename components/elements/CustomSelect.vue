<template>
  <div class="select-options">
    <div class="select-options__title">
      {{ title }}
    </div>
    <button
      :class="[typeBackground, typeDisabled]"
      :disabled="disabled"
      @click.prevent="open = !open"
      class="select-options__toggler"
    >
      <div ref="optionTitle">
        {{ selected }}
      </div>
      <seta :class="{ 'select-options__seta--open': open }" class="select-options__seta" />
    </button>
    <transition name="fade">
      <ul v-show="open" class="select-options__select">
        <li
          :value="option.value"
          :key="index"
          v-for="(option, index) in options"
          class="select-options__options"
        >
          <button @click.prevent="setSelectedValue(option)">
            {{ option.title }}
          </button>
        </li>
      </ul>
    </transition>
  </div>
</template>
<script>
export default {
  name: 'CustomSelect',
  props: {
    options: {
      type: Array,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    type: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    selectedIndex: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      open: false,
      selected: {}
    }
  },
  computed: {
    typeBackground () {
      if (!this.type) {
        return 'default'
      }
      else {
        return 'forms'
      }
    },
    typeDisabled () {
      if (!this.disabled) {
        return ''
      }
      else {
        return 'disabled'
      }
    }
  },
  created () {
    this.selected = this.options[this.selectedIndex].title
  },
  methods: {
    setSelectedValue (option) {
      this.$refs.optionTitle.textContent = option.title
      this.selected = option.title
      this.open = false
      this.$emit('optionValue', option.value)
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/assets/variables.scss';
.select-options {
  &__select {
    list-style-type: none;
    margin: 0 0 2rem 0;
    padding: 0;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.24);
    li:first-child {
      display: none;
    }
  }
  &__title {
    color: white;
  }
  button {
    margin-top: 8px;
    height: 48px;
    width: 100%;
    text-align: left;
    cursor: pointer;
    border: 0;
    padding-left: 0.5rem;
    transition: background-color ease-in-out 0.35s;
    &.default {
      background-color: rgba(255, 255, 255, 0.05);
      color: #fff;
      &:hover {
        background-color: rgba(255, 255, 255, 0.15);
      }
    }
    &.disabled {
      cursor: not-allowed;
      background-color: #ccc;
      &:hover {
        background-color: #ccc;
      }
    }
    &.forms {
      background-color: rgba(0, 0, 0, 0.08);
      color: #000;
      &:hover {
        background-color: rgba(0, 0, 0, 0.1);
      }
    }
    &:focus {
      outline: none;
    }
  }
  &__seta {
    max-width: 20px;
    transition: transform ease-in-out 300ms;
    &--open {
      transform: rotate(-180deg);
    }
  }
  &__toggler {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 0.25rem;
    margin-bottom: 10px;
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
