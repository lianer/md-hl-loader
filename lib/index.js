const loaderUtils = require('loader-utils')
const MarkdownIt = require('markdown-it')
const hljs = require('highlight.js')

/**
 * 语法高亮
 * @param {String} str 内容
 * @param {String} lang 语言
 */
const highlight = function (str, lang) {
  if (!(lang && hljs.getLanguage(lang))) {
    return '';
  }
  // http://highlightjs.readthedocs.io/en/latest/api.html
  return hljs.highlight(lang, str, true).value;
}

const defaultOptions = {
  // https://github.com/markdown-it/markdown-it#init-with-presets-and-options
  html: true,
  breaks: false,
  highlight
}

module.exports = function (content) {
  let options = Object.assign({}, defaultOptions, loaderUtils.getOptions(this))
  let md = new MarkdownIt(options)
  let result = md.render(content)
  // result = result.replace(/\r?\n/g, '')
  result = escape(result)
  return `module.exports = unescape('${result}')`
}
