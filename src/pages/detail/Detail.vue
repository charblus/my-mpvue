<template>
  <div>
    <!-- 图书id{{bookid}} -->
    <BookInfo :info='info'></BookInfo>
    <!-- <button open-type='share' class="btn">转发给好友</button> -->
  </div>
</template>
<script>
import {get} from '@/util'
import BookInfo from '@/components/BookInfo'
export default {
  components: {
    BookInfo
  },
  data () {
    return {
      bookid: '',
      info: {}
    }
  },
  methods: {
    async getDetail () {
      const info = await get('/weapp/bookdetail', {id: this.bookid})
      wx.setNavigationBarTitle({
        title: info.title
      })
      console.log(info)
      this.info = info
    },
  },
  onShareAppMessage: function(res) {
    return {
      title: this.info.title,
      path: 'pages/detail/main',
      imageUrl:'',  // 不填写默认页面截图
      // success: function (shareTickets) {
      //   // console.info(shareTickets + '成功');
      //   console.log(shareTickets + '成功');
      //   // 转发成功
      // },
      // fail: function (res) {
      //   console.log(res + '失败');
      //   // 转发失败
      // },
      // complete:function(res){
      //   console.log(res + '不管成功失败都会执行');
      //   // 不管成功失败都会执行
      // }
    }
	},
  mounted () {
    this.bookid = this.$root.$mp.query.id;  // 跳转页面使用this.$root.$mp.query获取参数
    this.getDetail();
    // wx.showShareMenu({
    //   withShareTicket: true
    // });
  }
}
</script>
<style lang="scss">

</style>
