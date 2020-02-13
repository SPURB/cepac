<template>
  <button @click.prevent="printPage">
    <span>&DownArrowBar;</span>
    {{ message }}
  </button>
</template>
<script>
export default {
  name: 'PdfGenerator',
  props: {
    pdfDocDefinition: { // crie a definição no playgound do pdfmake -> http://pdfmake.org/playground.html
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
    loadExternalLib (url) {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script')
        script.onload = () => { resolve(`${url} está pronta`) }
        script.async = true
        script.src = url
        document.head.appendChild(script)
      })
    },
    printPage () {
      this.isLoading = true
      this.message = 'Criando arquivo'
      this.loadExternalLib('https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.62/pdfmake.min.js')
        .then(() => {
          this.loadExternalLib('https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.62/vfs_fonts.js')
            .then(() => {
              const dateStr = new Date().toISOString().slice(0, 19)
              const fileName = `${this.$route.path.slice(1).replace('/', '-')}_${dateStr}.pdf`
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
