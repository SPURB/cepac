<template>
  <footer class="actions">
    <div class="action go-back">
      <button @click.prevent="go(goBackPath)">
        <span>&ldca;</span>
        Quadro geral
      </button>
    </div>
    <ul class="action__list">
      <li v-if="isSwitch(1)" class="action">
        <csv-generator :csv-doc-definition="csvDocDefinition" :file-name="fileName + '.xlsx'" />
      </li>
      <li v-if="isSwitch(2)" class="action">
        <json-generator :json-doc-definition="jsonDocDefinition" :file-name="fileName + '.json'" />
      </li>
      <li v-if="isSwitch(3)" class="action">
        <pdf-generator :pdf-doc-definition="pdfDocDefinition" :file-name="fileName + '.pdf'" />
      </li>
      <li v-if="isSwitch(4)" class="action">
        <image-generator :file-name="fileName + '.png'" />
      </li>
      <li v-if="isSwitch(5)" class="action">
        <geojson-generator :geojson-doc-definition="geojsonDocDefinition" :file-name="fileName + '.geojson'" />
      </li>
    </ul>
    <div v-if="goForward.path !== ''" class="action go-forward" style="text-align: end">
      <button @click.prevent="go(goForward.path)" class="action__button">
        <span>&rdca;</span>
        {{ goForward.text }}
      </button>
    </div>
  </footer>
</template>
<script>
import PdfGenerator from '~/components/elements/PdfGenerator'
import JsonGenerator from '~/components/elements/JsonGenerator'
import CsvGenerator from '~/components/elements/CsvGenerator'
import ImageGenerator from '~/components/elements/ImageGenerator'
import GeojsonGenerator from '~/components/elements/GeojsonGenerator'

export default {
  name: 'FooterActions',
  components: {
    PdfGenerator,
    JsonGenerator,
    CsvGenerator,
    ImageGenerator,
    GeojsonGenerator
  },
  props: {
    pdfDocDefinition: {
      type: Object,
      default: () => {}
    },
    jsonDocDefinition: {
      type: Array,
      required: true
    },
    geojsonDocDefinition: {
      type: undefined,
      required: true
    },
    csvDocDefinition: {
      type: Array,
      required: true
    },
    fileName: {
      type: String,
      required: true
    },
    goBackPath: {
      type: String,
      default: '/'
    },
    goForward: {
      type: Object,
      default: () => {
        return {
          path: '',
          text: ''
        }
      }
    },
    whichShow: {
      type: Array,
      required: true
    }
  },
  methods: {
    go (path) {
      this.$router.push({ path })
    },
    isSwitch (numero) {
      return !!this.whichShow.find(val => val === numero)
    }
  }
}
</script>

<style lang="scss">
@import '~/assets/variables';
.main--content {
  .actions {
    display: grid;
    grid-template-columns: 1fr 3fr 1fr;
    background-color: #005249;
    padding: 2rem 3.25rem;
    @supports not (display: grid) {
      display: flex;
      width: 100%;
      justify-content: space-between;
      @media (max-width: $tablet) {
        flex-direction: column;
      }
    }
    ul {
      display: flex;
      justify-content: center;
      @media(max-width: $tablet) {
        justify-content: space-between;
        display: block;
        li { margin-left: 0 }
      }
    }
    @media (max-width: $tablet) {
      grid-template-columns: 1fr;
      padding: 1rem;
      text-align: left;
      .go-back {
        margin: 0
      }
    }
    .action {
      margin: 0 1rem;
      button {
        margin: 0 2rem 1rem 0;
        &:last-child { margin-right: 0 }
        border: 0;
        padding: 1rem 1.25rem;
        background-color: rgba(255, 255, 255, .04);
        border-radius: 0.25rem;
        font-family: inherit;
        color: #FFF;
        font-size: initial;
        cursor: pointer;
        transition: all ease-out .2s;
        &:hover { background-color: #008375 }
        span {
          display: inline-block;
          width: 1.2rem;
          line-height: 1.2rem;
          border-radius: 1.2rem;
          background-color: rgba(255, 255, 255, .2);
          margin: 0 0.25rem 0 0;
          font-size: 0.8rem
        }
        @media (max-width: $tablet) {
          width: 100%;
          width: stretch;
        }
      }
    }
  }
}
</style>
