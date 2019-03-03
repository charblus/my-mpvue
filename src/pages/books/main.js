import Vue from 'vue'
import Book from './Book'

const app = new Vue(Book)
app.$mount()

export default{
  config: {
    // 是否全局开启下拉刷新。
    enablePullDownRefresh: true
  }
}
