<template>
  <div>
    <!-- <p>图书列表</p> -->
    <Card v-for="book in books" :key="book.openid" :book='book'></Card>
    <p class="text-footer" v-if="!more">
      没有更多数据
    </p>
  </div>
</template>
<script>
// 35条数据
// 每次加载10条
// 0页   0-10
// 1     10-20
// 2     20-30（5）
// page 当前第几页

// 没有更多数据
// 1. page=0 不能显示这条提醒
// 2. page>0 数据长度<10 停止触底加载

import {get} from '@/util'
import Card from '@/components/Card'
export default {
  components: {
    Card
  },
  data () {
    return {
      books: [],
      page: 0,
      more: true,
    }
  },
  methods: {
    async getList (init) {
      if (init) {
        this.page = 0;
        this.more = true;
      }
      wx.showNavigationBarLoading();
      const books = await get('/weapp/booklist', {page:this.page});
      if (books.list.length<10 && this.page>0) {
        this.more = false;  // 这种情况下 没有更多数据了
        // console.log(this.more);
      }
      if (init) {
        this.books = books.list;
        wx.stopPullDownRefresh();   // 手动停止下拉刷新
      } else {
        // 下拉刷新，不能直接覆盖books 而是累加
        this.books = this.books.concat(books.list); 
      }
      wx.hideNavigationBarLoading();  // 关闭下拉刷新加载
    },
    // async getTop() {
    //   const tops = await get('/weapp/top');
    //   this.tops = tops.list;
    // }
  },
  onPullDownRefresh() {
    this.getList(true);
    // console.log('下拉');

  },
  onReachBottom() {
    if (!more) {
      // 没有更多了
      return false;
    }
    this.page++;
    // console.log('上啦加载', this.page)
    this.getList();
  },
  mounted () {
    this.getList(true);
  }
}
</script>
<style>

</style>
