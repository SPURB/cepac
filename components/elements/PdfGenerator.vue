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
    pdfDocDefinition: { // crie a definição no playgound do pdfmake -> http://pdfmake.org/playground.html
      type: Object,
      required: true
    }
  },
  methods: {
    printPage () {
      const dateStr = new Date().toISOString().slice(0, 19)
      const fileName = `${this.$route.path.slice(1).replace('/', '-')}_${dateStr}.pdf`
      pdfMake.createPdf(this.pdfDocDefinition).download(fileName)
    }
  }
}
</script>
