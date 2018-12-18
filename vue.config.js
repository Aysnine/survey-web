module.exports = {
  devServer: {
    index: 'index.html'
  },
  pages: {
    index: {
      entry: 'src/pages/index/main.js',
      title: 'Index Page'
    },
    survey: {
      entry: 'src/pages/survey/main.js',
      title: 'Survey Page'
    },
    reply: {
      entry: 'src/pages/reply/main.js',
      title: 'Reply Page'
    }
  }
}
