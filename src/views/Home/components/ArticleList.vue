<template>
  <div>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      offset="50"
    >
      <!-- 文章列表 -->
      <article-item
      v-for="obj in list"
      :key="obj.art_id"
      :artObj="obj"
      @dislikeEV="disLike"
      @reportEV="report"
      @click.native="$router.push(`/article_detail?aid=${obj.art_id}`)">
      </article-item>
    </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import ArticleItem from '../../../components/ArtileItem.vue'
import { getAllArticleListAPI, articleDislikeAPI, articleReportsAPI } from '@/api'
import { Notify } from 'vant'

export default {
  props: {
    // list: Array
    channelId: Number // 传来的频道
  },
  data () {
    return {
      list: [], // 文章列表
      loading: false, // 底部加载状态
      finished: false, // 数据是否全部加载完毕
      nextTime: null, // 用于记载更多(分页)
      isLoading: false // 顶部刷新状态
    }
  },
  components: {
    ArticleItem
  },
  methods: {
    // 底部加载方法
    async getArticleList () {
      const res = await getAllArticleListAPI({
        channel_id: this.channelId, // 当前频道
        timestamp: this.nextTime
      })
      // console.log(res)
      // 如果无数据
      if (res.data.data.pre_timestamp === null) {
        this.finished = true // 记载全部数据
      } else {
        this.nextTime = res.data.data.pre_timestamp
        this.list = [...this.list, ...res.data.data.results]
        this.loading = false // 底部加载更多状态
      }
    },
    // 底部加载
    onLoad () {
    // 有第一页数据以后, onLoad再发请求
      if (this.list.length > 0) {
        this.getArticleList()
      }
    },
    // 顶部刷新事件方法
    onRefresh () {
      this.nextTime = null
      this.list = []
      this.getArticleList()
      this.isLoading = false
    },
    // 反馈(不感兴趣)
    async disLike (obj) {
      try {
        await articleDislikeAPI({
          target: obj.art_id
        })
        Notify({ type: 'success', message: '反馈成功' })
      } catch (err) {
        Notify({ type: 'warning', message: '反馈失败-联系程序员' })
      }
    },
    // 举报文章
    async report (obj, type) {
      try {
        await articleReportsAPI({
          target: obj.art_id,
          type: type,
          remark: '就是其他问题'
        })
        Notify({ type: 'success', message: '举报成功' })
      } catch (err) {
        Notify({ type: 'warning', message: '举报失败' })
      }
    }
  },
  async created () {
    this.getArticleList()
  }
}
</script>
