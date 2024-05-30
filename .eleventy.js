const yaml = require("js-yaml");
const { DateTime } = require("luxon");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const htmlmin = require("html-minifier");

const PostCSSPlugin = require("eleventy-plugin-postcss")

module.exports = function (config) {
  // constants
  const srcDir = "src"


  // Disable automatic use of your .gitignore
  config.setUseGitIgnore(false);

  // Merge data instead of overriding
  config.setDataDeepMerge(true);

  // human readable date
  config.addFilter("readableDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat(
      "dd LLL yyyy"
    );
  });

  // Syntax Highlighting for Code blocks
  config.addPlugin(syntaxHighlight);

  // To Support .yaml Extension in _data
  // You may remove this if you can use JSON
  config.addDataExtension("yaml", (contents) => yaml.load(contents));



  // Copy Static Files to /_site

  // this copies over css files seems like
  config.addPlugin(PostCSSPlugin)
  config.addPassthroughCopy(`${srcDir}/**/*.js`)
  config.addPassthroughCopy(`${srcDir}/assets`)
  config.addPassthroughCopy(`${srcDir}/admin/config.yml`)


  // Let Eleventy transform HTML files as nunjucks
  // So that we can use .html instead of .njk
  return {
    dir: {
      input: srcDir,
      // output dir is _site/ by default
      layouts: "_layouts",
    },
  };
};
