<template>
  <div>
    <!-- 头部 -->
    <div>
      <van-nav-bar fixed>
        <template #left>
          <img class="logo" :src="imgObj" />
        </template>
        <template #right>
          <van-icon name="search" size="0.48rem" color="#fff" @click="$router.push('/search')"/>
        </template>
      </van-nav-bar>
    </div>
    <!-- tab导航栏 -->
    <div class = 'main'>
      <van-tabs v-model="channelId" animated  sticky offset-top="1.226667rem">
        <van-tab :title="obj.name"
        v-for="obj in userChannelList"
        :key="obj.id"
        :name="obj.id">
        <article-list :channelId="channelId"></article-list>
        </van-tab>
      </van-tabs>
      <van-icon name="plus" size="0.37333334rem" class="moreChannels" @click="showPopup"/>
    </div>
    <!-- 弹出层 -->
    <van-popup class="channel_popup" v-model="show" get-container="body" @closed="onPopupClosed">
      <ChannelEdit
      @close="show = false"
      :userChannelList="userChannelList"
      :unCheckChannekList="unCheckChannekList"
      @addChannel="addChannelFn"
      @removeChannel="removeChannelFn"
      ref="channelEdit"
      @changeChannel="channgeChannelFn"/>
      </van-popup>
  </div>
</template>

<script>
import logoPng from '@/assets/toutiao_logo.png'
import { getUserChannelsAPI, getAllChannelsAPI, updateChannelAPI } from '@/api'
import ArticleList from './components/ArticleList.vue'
import ChannelEdit from './ChannelEdit.vue'

export default {
  name: 'Home',
  data () {
    return {
      imgObj: logoPng,
      channelId: 0,
      userChannelList: [], // 用户选择频道列表
      allChannelList: [], // 所有频道列表
      articleList: [],
      show: false // 控制弹出层
    }
  },
  components: {
    ArticleList,
    ChannelEdit
  },
  async created () {
    // 频道列表
    const res = await getUserChannelsAPI()
    this.userChannelList = res.data.data.channels

    // 所有频道
    const res2 = await getAllChannelsAPI()
    this.allChannelList = res2.data.data.channels
  },
  methods: {
    showPopup () {
      this.show = true
    },
    // 添加频道
    async addChannelFn (obj) {
      this.userChannelList.push(obj)
      // 最新的数组发送给后台
      await updateChannelAPI({
        channels: this.userChannelList
      })
    },
    // 删除频道
    async removeChannelFn (obj) {
      const index = this.userChannelList.findIndex(item => item.id === obj.id)
      this.userChannelList.splice(index, 1)
      // 最新的数组发送给后台
      await updateChannelAPI({
        channels: this.userChannelList
      })
    },
    // 弹层关闭-重置编辑频道状态
    onPopupClosed () {
      this.$refs.channelEdit.isEdit = false
    },
    // 切换频道
    channgeChannelFn (obj) {
      this.channelId = obj.id // 传过来的频道ID, 影响tabs默认v-model的选择
    }
  },
  computed: {
    unCheckChannekList () {
      // 得到用户未选择的频道
      return this.allChannelList.filter(obj => {
        const index = this.userChannelList.findIndex(obj2 => obj2.id === obj.id)
        if (index === -1) return true
      })
    }
  }
}
</script>

<style scoped lang="less">
.logo {
  width: 100px;
  height: 30px;
}
.main {
  padding-top: 46px;
}
// 设置 tabs 容器的样式
/deep/ .van-tabs__wrap {
  padding-right: 30px;
  background-color: #fff;
}

// 设置小图标的样式
.moreChannels {
  position: fixed;
  top: 62px;
  right: 8px;
  z-index: 999;
}
.channel_popup {
  height: 100vh;
  width: 100vw;
}
</style>
