<template>
  <button @click.prevent="createGeojson(fileName, geojsonDocDefinition)">
    <span style="font-size: 0.8rem">{ }</span>
    Salvar como .geojson
  </button>
</template>
<script>
import FileSaver from 'file-saver'

export default {
  name: 'GeojsonGenerator',
  props: {
    fileName: {
      required: true,
      type: String
    },
    geojsonDocDefinition: {
      type: undefined,
      required: true
    }
  },
  methods: {
    createGeojson (name, content) {
      const geojsonBlob = new Blob([JSON.stringify(content)], { type: 'text/geojson; charset=utf-8' })
      FileSaver.saveAs(geojsonBlob, name)
    }
  }
}
</script>
