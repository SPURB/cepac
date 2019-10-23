<template>
  <svg class="icon oficio" width="1000" height="1000" viewBox="0 0 1000 1000" :opacity="opacity">
    <path d="M233.334 300H166.667V766.667C166.667 803.334 196.667 833.334 233.334 833.334H700V766.667H233.334V300ZM766.667 166.667H366.667C330 166.667 300 196.667 300 233.334V633.334C300 670 330 700 366.667 700H766.667C803.334 700 833.334 670 833.334 633.334V233.334C833.334 196.667 803.334 166.667 766.667 166.667ZM733.334 466.667H400V400H733.334V466.667ZM600 600H400V533.334H600V600ZM733.334 333.334H400V266.667H733.334V333.334Z" :fill="fill" />
  </svg>
</template>

<script>
export default {
  name: 'Oficio',
  props: {
    fill: {
      type: String,
      default: 'black'
    },
    opacity: {
      type: Number,
      default: 1
    }
  }
}
</script>
