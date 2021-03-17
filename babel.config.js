// babel.config.js
module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          node: "current",
        },
      },
    ],
    "@babel/preset-react",
  ],
  plugins: [
    "@babel/transform-runtime",
    "@babel/plugin-proposal-class-properties",
    "inline-react-svg",
  ],
};
