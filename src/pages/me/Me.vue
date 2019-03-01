<template>
  <div class="container">
    <button  open-type="getUserInfo" @click="login">登录</button>
    <div class="userinfo" >
      <img :src="userInfo.avatarUrl" alt="">
      <p>{{userInfo.nickName}}</p>
    </div>
    <YearProgress></YearProgress>
    <button @click="scanBook" class='btn'>添加图书</button>
  </div>
</template>

<script>
import {showSuccess} from '@/util'
import config from '@/config'
import qcloud from 'wafer2-client-sdk'
import YearProgress from '@/components/YearProgress'
export default {
  components: {
    YearProgress
  },
  data () {
    return {
      isLogin: false,
      userInfo: { }
    }
  },
  methods: {
    login () {
      qcloud.setLoginUrl(config.loginUrl)
      qcloud.login({
        success: function (userInfo) {
          console.log('登录成功', userInfo)
          showSuccess('登录成功')
          wx.setStorageSync('userInfo', userInfo)
        },
        fail: function (err) {
          console.log('登录失败', err)
        }
      })
      this.userInfo = wx.getStorageSync('userInfo')
    },
    scanBook () {
      wx.scanCode({
        success (res) {
          console.log(res)
        }
      })
    }
  }
}

// import qcloud from 'wafer2-client-sdk'
// import config from '@/config'

// export default {
//   data () {
//     return {
//       userInfo: { }
//     }
//   },
//   methods: {
//     login(){
//       console.log('1122334455667799')
//       // qcloud.setLoginUrl(config.loginUrl);
//       // qcloud.login({
//       //     success: function (userInfo) {
//       //         console.log('登录成功', userInfo);
//       //         wx.setStorageSync('userInfo', userInfo)
//       //     },
//       //     fail: function (err) {
//       //         console.log('登录失败', err);
//       //     }
//       // });
//       // this.userInfo = wx.getStorageSync('userInfo')
//     }
//   }
// }
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

