<template>
  <div class="container">
    <button  v-if='!userInfo.openId'  open-type="getUserInfo" @click="login">登录</button>
    <div class="userinfo" >
      <img :src="userInfo.avatarUrl" alt="">
      <p>{{userInfo.nickName}}</p>
    </div>
    <YearProgress></YearProgress>
    <button v-if='userInfo.openId' @click="scanBook" class='btn'>添加图书</button>
  </div>
</template>

<script>
import {showSuccess, post, showModal} from '@/util'
import config from '@/config'
import qcloud from 'wafer2-client-sdk'
import YearProgress from '@/components/YearProgress'
export default {
  components: {
    YearProgress
  },
  data () {
    return {
      userInfo: {
        avatarUrl: require('../../../static/img/unlogin.png'),
        nickName: '未登录'
      }
    }
  },
  created () {
    this.onShow();
  },
  methods: {
    async addBook(isbn) {
     
      const res = await post('/weapp/addbook', {
        isbn,
        openid: this.userInfo.openId
      })
      console.log(res);
      showModal('添加成功', `${res.title}添加成功`)
    },
    scanBook () {
      wx.scanCode({
        success: (res) => {
          if (res.result) {
            console.log(res.result)
            this.addBook(res.result);
          }
        }
      })
    },
    login () {
      let user = wx.getStorageSync('userInfo')
      if (!user) {
        qcloud.setLoginUrl(config.loginUrl)
        qcloud.login({
          success: (userInfo) => {
            qcloud.request({
              url: config.userUrl,
              login: true,
              success: (userRes) => {
                showSuccess('登录成功')
                wx.setStorageSync('userInfo', userRes.data.data)
                this.userInfo = userRes.data.data
              }
            })
          },
          fail: function (err) {
            console.log('登录失败', err)
          }
        })
      }
    },
    onShow () {
      let userInfo = wx.getStorageSync('userInfo')
      if (userInfo) {
        this.userInfo = userInfo
      }
    },
  }
}

</script>





<style lang='scss'>
.container{
  padding:0 30rpx;
}  
.userinfo{
  margin-top:100rpx;
  text-align:center;
  img{
    width: 150rpx;
    height:150rpx;
    margin: 20rpx;
    border-radius: 50%;
  }
}


</style>

