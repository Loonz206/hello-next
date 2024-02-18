const path = require("path");
const withImages = require("next-images");
module.exports = withImages({
  swcMinify: true,
  exclude: path.resolve(__dirname, "src/assets/svg"),
  webpack(config, options) {
    return config;
  },
});

module.exports = {
  // put the domains where images will be placed
  images: {
    domains: ["media.giphy.com"],
    // remotePatterns: ["place-hold.it", "media.giphy.com", "images.unsplash.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/*",
      },
      {
        protocol: "https",
        hostname: "place-hold.it",
        port: "",
        pathname: "/*",
      },
      {
        protocol: "https",
        hostname: "media.giphy.com",
        port: "",
        pathname: "/*",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
    ],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  env: {
    // Will be available on both server and client
    NEXT_PUBLIC_CONTENTFUL_SPACE_ID:
      process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
    NEXT_PUBLIC_CONTENTFUL_ENVIROMENT:
      process.env.NEXT_PUBLIC_CONTENTFUL_ENVIROMENT,
    NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN:
      process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
  },
};
