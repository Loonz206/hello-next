const path = require("path");
const withImages = require("next-images");
module.exports = withImages({
  webpack(config, options) {
    return config;
  },
});

module.exports = {
  // put the domains where images will be placed
  images: {
    domains: ["place-hold.it", "media.giphy.com", "images.unsplash.com"],
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
