module.exports = {
  "presets": ["next/babel"],
  "plugins": [
    [
      "effector/babel-plugin",
      {
        "addLoc": true,
        "reactSsr": true
      }
    ],
    ["styled-components", { "ssr": true }]
  ]
}
