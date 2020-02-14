<template>
  <button @click.prevent="saveJson(fileName, jsonDocDefinition)">
    <span style="font-size: 0.8rem">{ }</span>
    Salvar como .json
  </button>
</template>
<script>
import FileSaver from 'file-saver'

export default {
  name: 'JsonGenerator',
  props: {
    fileName: {
      required: true,
      type: String
    },
    jsonDocDefinition: {
      required: true,
      type: Array
    }
  },
  methods: {
    saveJson (name, content) {
      const jsonBlob = new Blob([JSON.stringify(content)], { type: 'text/json; charset=utf-8' })
      FileSaver.saveAs(jsonBlob, name)
    }
  }
}
</script>
