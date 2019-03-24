<template>
  <div>
    <!-- 图书id{{bookid}} -->
    <BookInfo :info='info'></BookInfo>
    <CommentList :comments="comments"></CommentList>
    <div class="comment" v-if="showAdd">
      <textarea v-model="comment"
                class="textarea"
                :maxlength="100"
                placeholder="请输入图书短评"></textarea>
      <div class="location">
        地理位置：
         <switch color="#EA5A49" @change="getGeo" :checked="location" />
         <span class="text-primary">{{location}}</span>
      </div>
      <div class="phone">
        手机型号：
         <switch color="#EA5A49" @change="getPhone" :checked="phone"/>
         <span class="text-primary">{{phone}}</span>
      </div>
      <button class="btn" @click="addComment">评论</button>
    </div>
    <div v-else class="text-footer">
      未登录或者已经评论过啦
    </div>
    <button open-type='share' class="btn">转发给好友</button>
  </div>
</template>
<script>
import {get, post, showModal} from '@/util'
import BookInfo from '@/components/BookInfo'
import CommentList from '@/components/CommentList'
export default {
  components: {
    BookInfo,
    CommentList
  },
  data () {
    return {
      comments: [],
      userinfo: {},
      bookid: '',
      info: {},
      comment: '',
      location: '',
      phone: ''
    }
  },
  computed: {
    showAdd () {
      // 未登录
      if (!this.userinfo.openId) {
        return false
      }
      // 评论页面里查到有自己的openid
      if (this.comments.filter(v => v.openid === this.userinfo.openId).length) {
        return false
      }
      return true
    }
  },
  methods: {
    async addComment () {
      if (!this.comment) {
        return
      }
      // 评论内容 手机型号 地理位置 图书id 用户openid
      const data = {
        openid: this.userinfo.openId,
        bookid: this.bookid,
        comment: this.comment,
        phone: this.phone,
        location: this.location
      }
      try {
        console.log(data)
        await post('/weapp/addcomment', data)
        this.comment = ''
        this.getComments()
      } catch (e) {
        showModal('失败', e.msg)
      }
    },
    getGeo (e) {
      // NVYWM4sZYGjaHPpO6vwVk0j1v4ijBBKB
      const ak = 'NVYWM4sZYGjaHPpO6vwVk0j1v4ijBBKB'
      let url = 'http://api.map.baidu.com/geocoder/v2/'

      if (e.target.value) {
        wx.getLocation({
          type: 'wgs84',
          success: geo => {
            console.log('地理数据', geo)
            wx.request({
              url,
              data: {
                ak,
                location: `${geo.latitude},${geo.longitude}`,
                output: 'json'
              },
              success: res => {
                console.log('百度api返回', res)
                if (res.data.status === 0) {
                  this.location = res.data.result.addressComponent.city
                } else {
                  this.location = '未知地点'
                }
              }
            })
          }
        })
      } else {
        this.location = ''
      }
    },
    getPhone (e) {
      if (e.target.value) {
        const res = wx.getSystemInfoSync()
        // console.log(res.model);
        this.phone = res.model
      } else {
        this.phone = ''
      }
    },
    async getDetail () {
      const info = await get('/weapp/bookdetail', {id: this.bookid})
      wx.setNavigationBarTitle({
        title: info.title
      })
      console.log(info)
      this.info = info
    },
    async getComments () {
      const comments = await get('/weapp/commentlist', {bookid: this.bookid})
      console.log('comments', comments)
      this.comments = comments.list || []
    }
  },
  onShareAppMessage: function (res) {
    return {
      title: this.info.title,
      path: 'pages/detail/main',
      imageUrl: '' // 不填写默认页面截图
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
    this.bookid = this.$root.$mp.query.id // 跳转页面使用this.$root.$mp.query获取参数
    this.getDetail()
    this.getComments()
    const userinfo = wx.getStorageSync('userInfo')
    console.log('userInfo', userinfo)
    if (userinfo) {
      this.userinfo = userinfo
    }
    // wx.showShareMenu({
    //   withShareTicket: true
    // });
  }
}
</script>
<style lang="scss">
.comment {
  margin-top: 10px;
  .textarea {
    width: 730rpx;
    background-color: #eee;
    padding: 10px;
  }
  .location {
    margin-top: 10px;
    padding: 5px 10px;
  }
  .phone {
    margin-top: 10px;
    padding: 5px 10px;
  }
  .btn {
     margin: 10px 0;
  }
}
</style>
