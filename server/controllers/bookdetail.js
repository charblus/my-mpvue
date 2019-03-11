const {mysql} = require('../qcloud')

module.exports = async (ctx) => {
  const {id} = ctx.request.query
  const detail = await mysql('books')
                       .select()
                       .where('id', id)
                       .first()

  // console.log(detail)
  ctx.state.data = detail

  // 浏览量+1
  await mysql('books')
          .where('id', id)
          .increment('count', 1)
}
