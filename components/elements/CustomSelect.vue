<template>
  <div class="select-options">
    <div class="select-options__title">
      {{ options.title }}
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
      <svg :class="{ open }" width="17" height="17" viewBox="0 0 400 248" fill="none">
        <path d="M47 0.334229L200 153.001L353 0.334229L400 47.3342L200 247.334L0 47.3342L47 0.334229Z" fill="white" />
      </svg>
    </button>
    <transition name="fade">
      <ul v-show="open" class="select-options__select">
        <li
          :value="option.value"
          :key="index"
          v-for="(option, index) in options.values"
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
      type: Object,
      required: true
    },
    type: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      open: false,
      selected: ''
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
      else { // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.selected = this.options.values[0].title
        return 'disabled'
      }
    }
  },
  created () {
    this.selected = this.options.values[0].title
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
@import '../../assets/variables.scss';
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
    font-size: 14pt;
    color: white;
  }
  button {
    height: 48px;
    width: 100%;
    text-align: left;
    cursor: pointer;
    border: 0;
    font-size: 1rem;
    padding-left: 1.75rem;
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
  &__toggler {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 0.25rem;
    margin-bottom: 10px;

    .open {
      transform: rotate(180deg);
    }
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
