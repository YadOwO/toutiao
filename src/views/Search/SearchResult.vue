<template>
    <div>
      <!-- 搜索结果页-头部导航 -->
      <div class="search-result-container">
        <!-- 点击实现后退效果 -->
        <van-nav-bar
          title="搜索结果"
          left-arrow
          @click-left="$router.go(-1)"
          fixed
        />
      </div>
      <div>
        <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :immediate-check="false"
        offset="50"
      >
        <article-item
        v-for="artObj in artList"
        :key="artObj.art_id"
        :artObj="artObj"
        :isShow="false"
        @click.native="$router.push(`/article_detail?aid=${artObj.art_id}`)"></article-item>
        </van-list>
      </div>
    </div>
</template>

<script>
import { searchResultListAPI } from '@/api'
import ArticleItem from '@/components/ArtileItem.vue'
export default {
  name: 'SearchResult',
  async created () {
    const res = await searchResultListAPI({
      q: this.$route.params.keywords // 拿到关键词, keywords来源于router/index.js你定义的动态路由参数名
    })
    // console.log(res)
    this.artList = res.data.data.results
  },
  components: {
    ArticleItem
  },
  data () {
    return {
      artList: [],
      loading: false, // 加载状态
      finished: false, // 全部加载完成状态
      page: 1 // 页码
    }
  },
  methods: {
    // 触底加载更多
    async onLoad () {
      if (this.artList.length > 0) {
        this.page++
        const res = await searchResultListAPI({
          q: this.$route.params.keywords, // 拿到关键词, keywords来源于router/index.js你定义的动态路由参数名
          page: this.page
        })
        if (res.data.data.results.length === 0) {
          this.finished = true
          return
        }
        // console.log(res)
        this.artList = [...res.data.data.results, ...this.artList]
        this.loading = false
      }
    }
  }

}
</script>

<style lang="less" scoped>
.search-result-container {
  padding-top: 46px;
}
</style>
