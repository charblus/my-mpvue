const {mysql} = require('../qcloud')

module.exports = async (ctx) => {
  const {id} = ctx.request.query
  const detail = await mysql('books')
                       .select('books.*', 'cSessionInfo.user_info')
                       .join('cSessionInfo', 'books.openid', 'cSessionInfo.open_id')
                       .where('id', id)
                       .first()

  // console.log(detail)
  const info = JSON.parse(detail.user_info)
  ctx.state.data = Object.assign({}, detail, {
    user_info: {
      name: info.nickName,
      image: info.avatarUrl
    }
  })

  // 浏览量+1
  await mysql('books')
          .where('id', id)
          .increment('count', 1)
}
