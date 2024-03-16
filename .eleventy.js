module.exports = function(eleventyConfig) {
    eleventyConfig.addPassthroughCopy("app.js");
    eleventyConfig.addWatchTarget("./*.scss");
  
  };