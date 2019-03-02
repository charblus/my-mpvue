
const https = require('https')
const { mysql } = require('../qcloud')
// 新增图书  1. 获取豆瓣信息  2 入库
// https://api.douban.com/v2/book/isbn/9787536692930
module.exports = async (ctx) => {
  const { isbn, openid } = ctx.request.body
  console.log('添加图书', isbn, openid)
  if (isbn && openid) {
    // 录入异常情况
    const findRes = await mysql('books').select().where('isbn', isbn)
    if (findRes.length) {
      ctx.state = {
        code: -1,
        data: {
          msg: '图书已存在'
        }
      }
      return
    }

    let url = 'https://api.douban.com/v2/book/isbn/' + isbn
    console.log('链接', url)
    const bookInfo = await getJSON(url)
    const rate = bookInfo.rating.average
    const { title, image, alt, publisher, summary, price } = bookInfo
    const tags = bookInfo.tags.map(v => {
      return `${v.title} ${v.count}`
    }).join(',')
    const author = bookInfo.author.join(',')
    try {
      // 写入库
      await mysql('books').insert({
        isbn, openid, rate, title, image, alt, publisher, summary, price, tags, author
      })
      ctx.state.data = {
        title,
        msg: 'success'
      }
    } catch (e) {
      ctx.state = {
        code: -1,
        data: {
          msg: '新增失败:' + e.sqlMessage
        }
      }
    }
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
        const bookInfo = JSON.parse(urlData)
        if (bookInfo.title) {
          resolve(bookInfo)
        }
        reject(bookInfo)
      })
    })
  })
}
