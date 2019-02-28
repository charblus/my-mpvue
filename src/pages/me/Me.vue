<template>
  <div class="container">
    <button open-type="getUserInfo" @click="login">用户信息</button>
    <div class="userinfo" >
      <img :src="userInfo.avatarUrl" alt="">
      <p>{{userInfo.nickName}}</p>
    </div>

    <button class='btn'>添加图书</button>
  </div>
</template>

<script>

import config from '@/config'
import qcloud from 'wafer2-client-sdk'
export default {
    data () {
    return {
      userInfo: { }
    }
  },
  methods: {
    login () {
      qcloud.setLoginUrl(config.loginUrl);
      qcloud.login({
          success: function (userInfo) {
              console.log('登录成功', userInfo);
              wx.setStorageSync('userInfo', userInfo)
          },
          fail: function (err) {
              console.log('登录失败', err);
          }
      });
      this.userInfo = wx.getStorageSync('userInfo')
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

