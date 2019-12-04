<template>
  <button @click.prevent="printPage">
    <span>&DownArrowBar;</span>
    Salvar como .pdf
  </button>
</template>
<script>
import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'
pdfMake.vfs = pdfFonts.pdfMake.vfs

export default {
  name: 'PdfGenerator',
  props: {
    pdfDocDefinition: {// crie a definição no playgound do pdfmake -> http://pdfmake.org/playground.html
      type: Object,
      required: true
    }
  },
  methods: {
    printPage () {
      pdfMake.createPdf(this.pdfDocDefinition).download('optionalName.pdf')
    }
  }
}
</script>
