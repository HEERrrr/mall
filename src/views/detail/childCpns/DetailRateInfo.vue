<template>
  <div id="rate_info">
    <div class="top">
      <span>用户评价</span>
      <a href="#" class="more">更多</a>
    </div>
    <div v-if="Object.keys(rateInfo).length !== 0">
      <div class="user">
        <img :src="rateInfo.user.avatar" alt="" />
        <span>{{ rateInfo.user.uname }}</span>
      </div>
      <div class="rate_attribute">
        <span class="rate_date">{{ dateFilter }}</span>
        <span>{{ rateInfo.style }}</span>
      </div>
      <div class="rate">
        <div
          class="rate_extraInfo"
          v-for="(item, index) in rateInfo.extraInfo"
          :key="index"
        >
          {{ item }}
        </div>
        <div class="rate_content">{{ rateInfo.content }}</div>
        <div class="rate_images" v-if="rateInfo.images">
          <div v-for="(item, index) in rateInfo.images" :key="index">
            <img :src="item" />
          </div>
        </div>
      </div>
      <div class="explain" v-if="rateInfo.explain">{{ rateInfo.explain }}</div>
    </div>
    <div v-else class="empty"></div>
  </div>
</template>
<script>
export default {
  name: "DetailRateInfo",
  props: {
    rateInfo: {
      type: Object,
    },
  },
  computed: {
    dateFilter() {
      const date = new Date(this.rateInfo.created * 1000);
      const Y = date.getFullYear() + "-";
      const M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      const D = date.getDate() + " ";
      return Y + M + D;
    },
  },
};
</script>
<style scoped>
#rate_info {
  padding: 0 15px 20px;
  border-bottom: 5px solid #f2f5f8;
  font-size: 15px;
}
.top {
  padding: 15px 0;
  border-bottom: 2px solid #f2f5f8;
  color: #333;
}
.top .more {
  float: right;
}
.user {
  padding: 15px 0;
}
.user img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}
.rate_attribute {
  margin-bottom: 10px;
  color: #999;
}
.rate_date {
  margin-right: 10px;
}
.rate {
  line-height: 20px;
}
.rate_images {
  display: flex;
  margin-top: 10px;
}
.rate_images img {
  width: 115px;
  height: 115px;
  margin-right: 5px;
}
.explain {
  margin-top: 10px;
  padding: 10px;
  background-color: #f6f6f6;
  border-radius: 10px;
}
/* 没有评价时设置样式 */
.empty {
  height: 50px;
}
</style>
