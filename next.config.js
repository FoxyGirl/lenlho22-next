const withPlugins = require("next-compose-plugins");

module.exports = withPlugins([], {
  trailingSlash: true,
  // async redirects() {
  //   return [
  //     {
  //       source: '/',
  //       destination: '/blog',
  //       permanent: false,
  //     }
  //   ]
  // }
});
