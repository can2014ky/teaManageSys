module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ["plugin:vue/essential", "@vue/airbnb"],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "global-require": 0,
    "linebreak-style": [0, "error", "windows"],
    "max-len": ["error", { code: 200 }],
    camelcase: 0,
  },
  parserOptions: {
    parser: "babel-eslint",
  },
};
