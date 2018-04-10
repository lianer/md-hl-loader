# md-hl-loader

> Markdown => HTML

## Install

```bash
npm install md-hl-loader -D
```

## Configuration

webpack basic

```js
// ...
rules: [
  {
    test: /\.md$/,
    loader: 'md-hl-loader'
  }
]
// ...
```

with options

```js
// ...
rules: [
  {
    test: /\.md$/,
    loader: 'md-hl-loader',
    // https://github.com/markdown-it/markdown-it#init-with-presets-and-options
    options: {
      html: true
    }
  }
]
// ...
```

## Usage

./article.md

```md
# Test
```

./app.js

```js
import article from './article.md'
import 'highlight.js/styles/github.css'
console.log(article) // '<h1>Test</h1>'
```
