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
  </div>
</template>
<script>
export default {
  props: ['info']
}
</script>
<style lang="scss">
.bookinfo {
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
