
<script>
import {showSuccess} from '@/util'
import config from '@/config'
import qcloud from 'wafer2-client-sdk'
export default {
  async created () {
    let user = wx.getStorageSync('userInfo')
    if (!user) {
      qcloud.setLoginUrl(config.loginUrl)
      qcloud.login({
        success: function (userInfo) {
          showSuccess('登录成功')
          wx.setStorageSync('userInfo', userInfo)
        },
        fail: function (err) {
          console.log('登录失败', err)
        }
      })
    }

    // const res = await get('/weapp/demo')
    // console.log(123, res)
    // wx.request({
    //   url:config.host+'/weapp/demo',
    //   success:function(res){
    //     console.log(res)
    //   }
    // })
    console.log('小程序启动了')
  }
}
</script>

<style>
.text-footer{
  text-align: center;
  font-size: 12px;
  margin-bottom:5px;
}
.text-primary{
  color:#EA5149;
}
.btn{
  color:white;
  background:#EA5A49;
  margin-bottom: 10px;
  padding-left: 15px;
  padding-left: 15px;
  border-radius: 2px;
  font-size: 16px;
  line-height: 40px;
  height: 40px;
  width: 100%;
}
.btn:active{
  background: #FA5A49;
}
</style>
