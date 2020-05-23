module.exports = {
  globDirectory: "dist",
  globPatterns: [
    "**/*.{html,js,css,png,svg,jpg,gif,json,woff,woff2,eot,ico,webp,webmanifest,map}",
  ],
  swDest: "dist/service-worker.js",
  clientsClaim: true,
  skipWaiting: true,
};
