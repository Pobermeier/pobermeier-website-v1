const find = require("find");
const path = require("path");

const cssFiles = find.fileSync(/\.css$/, path.join(__dirname, "dist"));
const fileName = path.basename(cssFiles[0]);
console.log(fileName);

module.exports = function (grunt) {
  // Project configuration.
  grunt.initConfig({
    critical: {
      test: {
        options: {
          inline: "true",
          extract: "true",
          base: "./",
          css: [`dist/${fileName}`],
          width: 1920,
          height: 1080,
        },
        src: "dist/index.html",
        dest: "dist/index.html",
      },
    },
  });

  grunt.loadNpmTasks("grunt-critical");

  grunt.registerTask("default", ["critical"]);
};
