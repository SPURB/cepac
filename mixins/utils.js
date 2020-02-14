export const loadExternalLib = {
  methods: {
    loadExternalLib (url) {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script')
        script.onload = () => { resolve(`${url} está pronta`) }
        script.async = true
        script.src = url
        document.head.appendChild(script)
      })
    }
  }
}
