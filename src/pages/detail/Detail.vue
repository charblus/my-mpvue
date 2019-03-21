<template>
  <div>
    <!-- 图书id{{bookid}} -->
    <BookInfo :info='info'></BookInfo>
    <!-- <button open-type='share' class="btn">转发给好友</button> -->
    <div class="comment">
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
    </div>
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
      info: {},
      comment: '',
      location: '',
      phone: ''
    }
  },
  methods: {
    getGeo () {
      
    },
    getPhone(e) {
      if(e.target.value) {
        const res = wx.getSystemInfoSync();
        // console.log(res.model);
        this.phone = res.model;
      } else {
        this.phone = '';
      }
    },
    async getDetail () {
      const info = await get('/weapp/bookdetail', {id: this.bookid})
      wx.setNavigationBarTitle({
        title: info.title
      })
      console.log(info)
      this.info = info
    }
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
.comment {
  margin-top: 10px;
  .textarea {
    width: 730px;
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
}
</style>
