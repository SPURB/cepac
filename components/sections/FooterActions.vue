<template>
  <footer class="actions">
    <ul>
      <li v-for="(action, index) in actions" :key="index" class="actions__action">
        <button @click.prevent="saveTable(action.fileName, action.content)">
          {{ action.fileName }}
        </button>
      </li>
      <li v-if="pdf" class="actions__action">
        <button @click.prevent="printPage">
          PDF
        </button>
      </li>
    </ul>
  </footer>
</template>
<script>
import FileSaver from 'file-saver'

export default {
  name: 'FooterActions',
  props: {
    actions: {
      type: Array,
      required: true
    },
    pdf: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    printPage () {
      window.print()
    },
    saveTable (fileName, content) {
      const nameSplit = fileName.split('.')
      const type = nameSplit[nameSplit.length - 1] // 'json' ou 'csv'

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
    extension (fileName) { return fileName }
  }
}
</script>

<style lang="scss" scoped>
.actions {
  background-color: #005249;
  padding: 2rem 3.25rem;
  text-align: center;
  ul {
    display: flex;
    justify-content: center;
  }
}
.actions__action {
  button {
    margin: 0 2rem 0 0;
    border: 0;
    padding: 0.5rem 0.75rem;
    background-color: rgba(255, 255, 255, .04);
    border-radius: 0.25rem;
    font-family: inherit;
    color: #FFF;
    font-size: initial;
    cursor: pointer;
    transition: all ease-out .2s;
    &:hover {
      background-color: #008375;
    }
  }
}
</style>
