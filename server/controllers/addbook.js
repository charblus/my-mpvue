
const https = require('https')
// 新增图书  1. 获取豆瓣信息  2 入库
// https://api.douban.com/v2/book/isbn/9787536692930
module.exports = async (ctx) => {
  const { isbn, openId } = ctx.request.body
  console.log('添加图书', isbn, openId)
  if (isbn && openId) {
    let url = 'https://api.douban.com/v2/book/isbn/' + isbn
    console.log('链接', url)
    const bookInfo = await getJSON(url)
    const rate = bookInfo.rating.average
    const { title, image, alt, publisher, summary, price } = bookInfo
    const tags = bookInfo.tags.map(v => {
      return `${v.title} ${v.count}`
    }).join(',')
    const author = bookInfo.author.join(',')
    console.log({
      rate, title, image, alt, publisher, summary, price, tags, author
    })
  }
}

function getJSON (url) {
  return new Promise((resolve, reject) => {
    https.get(url, res => {
      let urlData = ''
      res.on('data', data => {
        urlData += data
      })
      res.on('end', data => {
        const bookInfo = JSON.parse(data)
        if (bookInfo.title) {
          resolve(bookInfo)
        }
        reject(bookInfo)
      })
    })
  })
}
