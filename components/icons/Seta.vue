<template>
  <svg
    class="icon seta"
    :class="{ rotate }"
    width="80"
    height="52"
    viewBox="0 0 80 52"
    :fill="fill"
  >
    <g filter="url(#filter0_d)">
      <path d="M9 6L39 36L69 6" stroke="white" stroke-width="5" />
    </g>
    <defs>
      <filter
        id="filter0_d"
        x="0.232178"
        y="0.232239"
        width="79.5355"
        height="51.3033"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        <feFlood flood-opacity="0" result="BackgroundImageFix" />
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
        <feOffset dx="1" dy="4" />
        <feGaussianBlur stdDeviation="4" />
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
      </filter>
    </defs>
  </svg>
</template>

<script>
export default {
  name: 'Seta',
  props: {
    fill: {
      type: String,
      default: 'none'
    },
    rotate: {
      type: Boolean,
      default: false
    }
  }
}
</script>
<style lang="scss" scoped>
.rotate {
  transform: rotate(270deg);
}
</style>
