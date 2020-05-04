module.exports = function (grunt) {
  // Project configuration.
  grunt.initConfig({
    critical: {
      test: {
        options: {
          base: "./",
          css: [
            "src/css/main.css",
            "src/css/bulma.css",
            "src/css/fontawesome-all.css",
            "src/css/normalize.css",
          ],
          width: 1080,
          height: 1920,
        },
        src: "src/index.html",
        dest: "src/css/critical.css",
      },
    },
  });

  grunt.loadNpmTasks("grunt-critical");

  grunt.registerTask("default", ["critical"]);
};
