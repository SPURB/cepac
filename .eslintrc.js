module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended'
  ],
  rules: {
    "no-console": "off",
    "no-unused-vars": "warn",
    "brace-style": ["error", "stroustrup", { "allowSingleLine": true }]
  }
}
