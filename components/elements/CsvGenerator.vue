<template>
  <button @click.prevent="createCsv(csvDocDefinition, fileName)">
    <span style="font-size: 0.8rem">&boxplus;</span>
    {{ message }}
  </button>
</template>

<script>
import FileSaver from 'file-saver'
import { loadExternalLib } from '~/mixins/utils'

export default {
  name: 'CsvGenerator',
  mixins: [ loadExternalLib ],
  props: {
    csvDocDefinition: {
      required: true,
      type: Array
    },
    fileName: {
      required: true,
      type: String
    }
  },
  data () {
    return {
      isLoading: false,
      message: 'Salvar como .csv'
    }
  },
  methods: {
    createCsv (content, name) {
      this.isLoading = true
      this.message = 'Criando arquivo'
      this.loadExternalLib('https://cdn.jsdelivr.net/npm/json2csv')
        .then(() => {
          const csvBlob = new Blob([window.json2csv.parse(content)], { type: 'text/csv; charset=utf-8' })
          FileSaver.saveAs(csvBlob, name)
        })
        .finally(() => {
          this.isLoading = false
          this.message = 'Salvar como .csv'
        })
    }
  }
}
</script>
