<template>
  <!-- 一条文章单元格 -->
  <van-cell>
    <!-- 标题区域的插槽 -->
    <template #title>
      <div class="title-box">
        <!-- 标题 -->
        <span>{{ artObj.title }}</span>
        <!-- 单图 -->
        <img class="thumb"
        :src="artObj.cover.images[0]"
        v-if="artObj.cover.type === 1"/>
      </div>
      <!-- 三张图片 -->
        <div class="thumb-box" v-if="artObj.cover.type > 1">
          <img class="thumb"
             v-for="(imgUrl, index) in artObj.cover.images"
             :key="index"
             :src="imgUrl" />
        </div>
    </template>
    <!-- label 区域的插槽 -->
    <template #label>
      <div class="label-box">
        <div>
          <span>{{ artObj.aut_name }}</span>
          <span>{{ artObj.comm_count }} 评论</span>
          <span>{{ formatTime(artObj.pubdate) }}</span>
        </div>
        <!-- 反馈按钮 -->
        <van-icon name="cross" @click.stop="show = true" v-if="isShow"/>
        <van-action-sheet
        v-model="show"
        :actions="actions"
        @select="onSelect"
        get-container="body"
        :cancel-text="cancelText"
        @cancel="onCancel"/>
      </div>
    </template>
  </van-cell>
</template>

<script>
import { timeAgo } from '@/utils/date.js'
import { firstActions, secondActions } from '@/api/report'

export default {
  props: {
    artObj: Object,
    isShow: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      show: false, // 反馈面板
      actions: firstActions,
      cancelText: '取消'
    }
  },
  methods: {
    formatTime: timeAgo,
    onSelect (action) {
      // action绑定的数据对象, index是索引
      if (action.name === '反馈垃圾内容') {
        // 证明点击的是反馈垃圾内容
        this.actions = secondActions
        this.cancelText = '返回' // 修改底部按钮显示文字
      } else if (action.name === '不感兴趣') {
        this.$emit('dislikeEV', this.artObj)
        this.show = false // 关闭弹窗
      } else {
        // 这里就是二级反馈
        this.$emit('reportEV', this.artObj, action.value) // 外面需要反馈类型的值
        this.show = false
      }
    },
    onCancel () {
      if (this.cancelText === '返回') {
        this.actions = firstActions
        this.cancelText = '取消'
        this.show = true // 点返回不要让弹窗关闭, 点取消文字按钮, 弹窗默认关闭
      }
    }
  }
}
</script>

<style scoped lang="less">
/* 标题样式 */
.title-box {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

/* label描述样式 */
.label-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* 文章信息span */
.label-box span {
  margin: 0 3px;
  &:first-child {
    margin-left: 0;
  }
}
/* 图片的样式, 矩形黄金比例：0.618 */
.thumb {
  width: 113px;
  height: 70px;
  background-color: #f8f8f8;
  object-fit: cover;
}

/* 三图, 图片容器 */
.thumb-box {
  display: flex;
  justify-content: space-between;
}
</style>
