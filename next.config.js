const withPlugins = require("next-compose-plugins");

module.exports = withPlugins([], {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      return {
        ...config,
        node: {
          fs: "empty",
        },
      };
    }

    return config;
  },
});
