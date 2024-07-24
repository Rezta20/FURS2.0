module.exports = {
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "@typescript-eslint/parser",
    ecmaVersion: 2020,
    sourceType: "module",
  },
  extends: [
    "plugin:vue/vue3-essential",
    "plugin:@typescript-eslint/recommended",
    "@vue/typescript/recommended",
    "prettier",
  ],
  rules: {
    // 你的規則
  },
};
