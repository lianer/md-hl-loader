const path = require('path')
const loaderUtils = require('loader-utils')
const MarkdownIt = require('markdown-it')
const hljs = require('highlight.js')
const slash = require('slash')

/**
 * highlight
 * @param {String} str code
 * @param {String} lang language
 */
const highlight = function (str, lang) {
  if (!(lang && hljs.getLanguage(lang))) {
    return '';
  }
  // http://highlightjs.readthedocs.io/en/latest/api.html
  return hljs.highlight(lang, str, true).value;
}

const defaultMarkdownItOptions = {
  // https://github.com/markdown-it/markdown-it#init-with-presets-and-options
  html: true,
  breaks: false,
  linkify: true,
  highlight
}

const defaultOptions = {
  compileImages: false
}

const isAbsoluteUrl = function (url) {
  return /^[a-z][a-z0-9+.-]*:/.test(url)
}

module.exports = function (content) {
  let options = Object.assign({}, defaultOptions, loaderUtils.getOptions(this))
  let markdownItOptions = Object.assign({}, defaultMarkdownItOptions, options.markdownItOptions)
  let md = new MarkdownIt(markdownItOptions)
  let result = md.render(content)
  result = escape(result)

  if (options.compileImages) {
    // %3Cimg%20src%3D%22
    // ===
    // <img src="
    result = result.replace(/(%3Cimg%20src%3D%22)([^%]*)/g, ($0, $1, $2) => {
      console.log($2, isAbsoluteUrl($2))
      if ($2.indexOf(0) === '/' || isAbsoluteUrl($2)) {
        return $1 + $2
      }
      let filepath = path.join(this.context, $2)
      filepath = slash(filepath)
      return `${$1}' + require('${filepath}') + '`
    })
  }

  return `
    module.exports = unescape('${result}')
  `
}
