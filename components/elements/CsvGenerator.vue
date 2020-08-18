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
      message: 'Salvar como .xlsx'
    }
  },
  methods: {
    async createCsv (content, name) {
      this.isLoading = true
      this.message = 'Criando arquivo'

      await this.loadExternalLib('https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.16.2/xlsx.full.min.js')

      const EXCEL_TYPE =
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'

      const worksheet = window.XLSX.utils.json_to_sheet(content)
      const workbook = {
        Sheets: {
          data: worksheet
        },
        SheetNames: ['data']
      }

      const excelBuffer = window.XLSX.write(workbook, {
        bookType: 'xlsx',
        type: 'array'
      })
      const csvBlob = new Blob([excelBuffer], {
        type: EXCEL_TYPE
      })

      FileSaver.saveAs(csvBlob, name)

      this.isLoading = false
      this.message = 'Salvar como .xlsx'
    }
  }
}
</script>
