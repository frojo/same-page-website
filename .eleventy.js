const yaml = require("js-yaml");
const { DateTime } = require("luxon");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const htmlmin = require("html-minifier");

const PostCSSPlugin = require("eleventy-plugin-postcss")

module.exports = function (config) {
  // constants
  const srcDir = "src"


	config.setBrowserSyncConfig({
		ui: {
      port: 3002
    }
	});


  // Disable automatic use of your .gitignore
  config.setUseGitIgnore(false);

  // Merge data instead of overriding
  config.setDataDeepMerge(true);

  // -- filters/collections
  /// grab an element from a collection by id 
  function getById(collection, id) {
    return collection.find((el) => el.data.id === id)
  }

  config.addFilter("getById", getById)



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
