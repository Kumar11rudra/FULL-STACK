export default {

  testEnvironment: "jsdom",

  moduleNameMapper: {
    "\\.(css|scss)$": "identity-obj-proxy"
  },

  setupFilesAfterEnv: [
    "@testing-library/jest-dom"
  ]

};
