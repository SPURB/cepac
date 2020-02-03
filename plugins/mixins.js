const helpers = {
  methods: {
    pluralize (str, pluralize) {
      return pluralize ? `${str}s` : str
    },
    isNotEmpty (str) {
      switch (str) {
        case '': return false
        case '-': return false
        case null: return false
        default: return true
      }
    }
  }
}
export { helpers }
