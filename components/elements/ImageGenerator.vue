<template>
  <div>
    <button @click.prevent="createImage(fileName)">
      <span style="font-size: 0.8rem">&boxplus;</span>
      {{ message }}
    </button>
    <a id="canvas-download" />
  </div>
</template>

<script>
export default {
  name: 'ImageGenerator',
  props: {
    fileName: {
      required: true,
      type: String
    }
  },
  data () {
    return {
      isLoading: false,
      message: 'Salvar como .png'
    }
  },
  methods: {
    createImage (name) {
      this.isLoading = true
      this.message = 'Criando arquivo'

      const canvas = document.querySelector('.ol-unselectable')
      const down = document.getElementById('canvas-download')
      const dataURL = canvas.toDataURL('image/png')
      down.download = name
      down.href = dataURL
      down.click()

      this.isLoading = false
      this.message = 'Salvar como .png'
    }
  }
}
</script>
