<template>
  <footer class="actions">
    <div class="action go-back">
      <button @click.prevent="go(goBackPath)">
        <span>&ldca;</span>
        Voltar para lista
      </button>
    </div>
    <ul>
      <li v-for="(action, index) in actions" :key="index" class="action">
        <button @click.prevent="saveTable(action.fileName, action.content)">
          <span v-if="extension(action.fileName) === 'json'" class="action__extension">{ }</span>
          <span v-else-if="extension(action.fileName) === 'csv'">&boxplus;</span>
          Salvar como .{{ extension(action.fileName) }}
        </button>
      </li>
      <li v-if="pdf" class="action">
        <pdf-generator :pdf-doc-definition="pdfDocDefinition" :use-css="useCss" />
      </li>
    </ul>
    <div class="action go-forward" style="text-align: end">
      <button v-if="goForward.path !== ''" @click.prevent="go(goForward.path)">
        <span>&rdca;</span>
        {{ goForward.text }}
      </button>
    </div>
  </footer>
</template>
<script>
import FileSaver from 'file-saver'
import PdfGenerator from '~/components/elements/PdfGenerator'

export default {
  name: 'FooterActions',
  components: { PdfGenerator },
  props: {
    actions: {
      type: Array,
      required: true
    },
    pdf: {
      type: Boolean,
      default: false
    },
    useCss: {
      type: Boolean,
      default: false
    },
    pdfDocDefinition: {
      type: Object,
      default: () => {
        return {}
      }
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
    }
  },
  methods: {
    go (path) {
      this.$router.push({ path })
    },
    saveTable (fileName, content) {
      const type = this.extension(fileName)

      if (type === 'json') {
        const jsonBlob = new Blob([JSON.stringify(content)], { type: 'text/json; charset=utf-8' })
        FileSaver.saveAs(jsonBlob, fileName)
      }

      else if (type === 'csv') {
        const csvBlob = new Blob([this.convertToCSV(content)], { type: 'text/csv; charset=utf-8' })
        FileSaver.saveAs(csvBlob, fileName)
      }

      else { throw new Error(`${type} não é um formato válido para conversão`) }
    },
    convertToCSV (objArray) {
      const array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray
      let str = `${Object.keys(objArray[0]).join(',')}\r\n` // header vem do primeiro objeto

      array.forEach((obj) => {
        let line = ''
        for (const key in obj) {
          if (line !== '') { line += ',' }
          line += obj[key]
        }
        str += `${line}\r\n`
      })

      return str
    },
    extension (fileName) {
      const split = fileName.split('.')
      return split[split.length - 1]
    }
  }
}
</script>

<style lang="scss">
@import '~/assets/variables';
.main--content {
  footer.actions {
    display: grid;
    grid-template-columns: 1fr 3fr 1fr
  }
}

footer.actions {
  background-color: #005249;
  padding: 2rem 3.25rem;
  @media (max-width: $tablet) {
    grid-template-columns: 1fr;
    text-align: left;
    .go-back {
      margin: 0
    }
  }
  @media print {
    footer, button, .actions, .action { display: none };
  }
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
      justify-content: left;
      li { margin-left: 0 }
    }
  }
  @media (max-width: $tablet) {
    padding: 1rem;
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
    }
  }
}
</style>
