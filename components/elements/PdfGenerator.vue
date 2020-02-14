<template>
  <button @click.prevent="printPage(fileName)">
    <span>&DownArrowBar;</span>
    {{ message }}
  </button>
</template>
<script>
import { loadExternalLib } from '~/mixins/utils'

export default {
  name: 'PdfGenerator',
  mixins: [ loadExternalLib ],
  props: {
    pdfDocDefinition: { // crie a definição no playgound do pdfmake -> http://pdfmake.org/playground.html
      type: Object,
      required: true
    },
    fileName: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      isLoading: false,
      message: 'Salvar como .pdf'
    }
  },
  methods: {
    printPage (fileName) {
      this.isLoading = true
      this.message = 'Criando arquivo'
      this.loadExternalLib('https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.62/pdfmake.min.js')
        .then(() => {
          this.loadExternalLib('https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.62/vfs_fonts.js')
            .then(() => {
              window.pdfMake.createPdf(this.pdfDocDefinition).download(fileName)
            })
        })
        .catch(err => console.error(err))
        .finally(() => {
          this.isLoading = false
          this.message = 'Salvar como .pdf'
        })
    }
  }
}
</script>
