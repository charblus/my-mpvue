<template>
  <div class="bookinfo">
    <div class="thumb">
      <img class="back" 
           :src="info.image"  
           mode="scaleToFill">
      <img class="img" 
           :src="info.image" 
           mode="aspectFit">
      <div class="info">
        <div class="title">
          {{info.title}}
        </div>
        <div class="author">
          {{info.author}}
        </div>
      </div>
    </div>
    <div class="owner detail">
        <img class="avatar" 
            :src="userinfo.image"
            mode="aspectFit">
           <!-- 添加人 -->
           {{userinfo.name}}
        <div class="right text-primary">
          {{info.rate}}分
          <Rate :value="info.rate"></Rate>
        </div>
      </div>
      <div class="detail">
        {{info.publisher}}
        <div class="right">
          {{info.price}}
        </div>
      </div>
  </div>
</template>
<script>
import Rate from '@/components/Rate'
export default {
  components: {
    Rate
  },
  props: ['info'],
  computed: {
    userinfo() {
      return this.info.user_info || {};
    }
  }
}
</script>
<style lang="scss">
.bookinfo {
  font-size: 14px;
  .right {
    float: right;
  }
  .detail {
    padding: 5px 10px;
    .avatar {
      width: 40rpx;
      height: 40rpx;
      border-radius: 50%;
      vertical-align: middle;
    }
  }
  .thumb {
    width: 750rpx;
    height: 450rpx;
    overflow: hidden;
    position: relative;
    .back {
      filter: blur(15px);
      width: 100%;
    }
    .img {
      position: absolute;
      width: 100%;
      height: 300rpx;
      left: 0;
      top: 30rpx;
    }
    .info {
      color: white;
      position: absolute;
      width: 100%;
      left: 0;
      top: 330rpx;
      text-align: center;
      .title {
        font-size: 16px;
      }
      .author {
        font-size: 14px;
      }
    }
  }
}
</style>
