<template>
  <div>
    <!-- Header 区域 -->
    <van-nav-bar
      fixed
      title="文章详情"
      left-arrow
      @click-left="$router.back()"
    />

    <!-- 文章信息区域 -->
    <div class="article-container">
      <!-- 文章标题 -->
      <h1 class="art-title">{{ artObj.title }}</h1>

      <!-- 用户信息 -->
      <van-cell center :title="artObj.aut_name" :label="timeAgo(artObj.pubdate)">
        <template #icon>
          <img :src="artObj.aut_photo" alt="" class="avatar" />
        </template>
        <template #default>
          <div>
            <van-button
              type="info"
              size="mini"
              v-if="artObj.is_followed"
              @click="followedFn(false)"
              >已关注</van-button
            >
            <van-button
              icon="plus"
              type="info"
              size="mini"
              plain
              v-else
              @click="followedFn(true)"
              >关注</van-button
            >
          </div>
        </template>
      </van-cell>

      <!-- 分割线 -->
      <van-divider></van-divider>

      <!-- 文章内容 -->
      <div class="art-content" v-html="artObj.content"></div>

      <!-- 分割线 -->
      <van-divider>End</van-divider>

      <!-- 点赞 -->
      <div class="like-box">
        <van-button
          icon="good-job"
          type="danger"
          size="small"
          v-if="artObj.attribute === 1"
          @click="loveFn(false)"
          >已点赞</van-button
        >
        <van-button
        v-else
        icon="good-job-o"
        type="danger"
        plain
        size="small"
        @click="loveFn(true)"
          >点赞</van-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import { articleDetailAPI, followedUserAPI, unFollowedUserAPI, articleLikeAPI, articleDisLikeAPI } from '@/api'
import { timeAgo } from '@/utils/date'

export default {
  async created () {
    const res = await articleDetailAPI(this.$route.query.aid)
    this.artObj = res.data.data
  },
  data () {
    return {
      artObj: {}
    }
  },
  methods: {
    timeAgo,
    // 作者关注/取关
    async followedFn (bool) {
      if (bool === true) { // 用户点了关注按钮
        // 业务: 关注用户
        // 显示: 已关注按钮
        this.artObj.is_followed = true
        await followedUserAPI({
          target: this.artObj.aut_id
        })
      } else { // 用户点了已关注按钮身上
        // 业务: 取消关注用户
        // 显示: 关注按钮
        this.artObj.is_followed = false
        await unFollowedUserAPI({
          uid: this.artObj.aut_id
        })
      }
    },
    // 文章点赞/取消点赞
    async loveFn (bool) {
      if (bool === true) { // 用户点在了点赞按钮上
        // 业务 => 点赞文章
        // 显示 => 已点赞按钮
        this.artObj.attitude = 1
        await articleLikeAPI({
          target: this.$route.query.aid
        })
      } else { // 用户点在了已点赞按钮上
        // 业务 => 取消点赞文章
        // 显示 => 点赞按钮
        this.artObj.attitude = -1
        await articleDisLikeAPI({
          artId: this.$route.query.aid
        })
      }
    }
  }
}
</script>

<style scoped lang="less">
.article-container {
  padding: 10px;
  margin-top: 46px;
}
.art-title {
  font-size: 16px;
  font-weight: bold;
  margin: 10px 0;
}

.art-content {
  font-size: 12px;
  line-height: 24px;
  width: 100%;
  overflow-x: scroll;
  word-break: break-all;
  /deep/ img {
    width: 100%;
  }
  /deep/ pre {
    white-space: pre-wrap;
    word-wrap: break-word;
  }
}

.van-cell {
  padding: 5px 0;
  &::after {
    display: none;
  }
}

.avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #f8f8f8;
  margin-right: 5px;
  border: none;
}

.like-box {
  display: flex;
  justify-content: center;
}
</style>
