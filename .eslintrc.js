module.exports = {
  env: {
    browser: true,
    es6: true
  },
  extends: ["prettier", "google"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module"
  },
  rules: {
    "max-len": 0,
    "prettier/prettier": 0,
    "object-curly-spacing": 0,
    quotes: 0,
    "comma-dangle": 0,
    indent: 0
  },
  plugins: ["prettier"]
};
