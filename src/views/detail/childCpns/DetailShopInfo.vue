<template>
  <div class="shop_info">
    <img :src="shopInfo.shopLogo" class="shop_logo" />
    <span class="shop_name">{{ shopInfo.name }}</span>
    <div class="shop_middleInfo">
      <div class="middleInfo_item middleInfo_l">
        <div>
          <p class="count">{{ sellFilter }}</p>
          <span class="text">总销量</span>
        </div>
        <div>
          <p class="count">{{ shopInfo.cGoods }}</p>
          <span class="text">全部宝贝</span>
        </div>
      </div>
      <div class="middleInfo_item middleInfo_r">
        <div
          v-for="(item, index) in shopInfo.score"
          :key="index"
          class="r_item"
        >
          <span class="name">{{ item.name }}</span>
          <!-- 动态绑定class,当isBetter不同时样式也不同 -->
          <span class="score" :class="{ score_high: item.isBetter }">{{
            item.score
          }}</span>
          <span class="degree" :class="{ degree_high: item.isBetter }">
            {{ item.isBetter ? "高" : "低" }}</span
          >
        </div>
      </div>
    </div>
    <div class="shop_enter">进店逛逛</div>
  </div>
</template>
<script>
export default {
  name: "DetailShopInfo",
  props: {
    shopInfo: {
      type: Object,
    },
  },
  computed: {
    // 过滤 是总销量以‘万’为单位
    sellFilter() {
      const cSells = this.shopInfo.cSells;
      return cSells >= 10000 ? (cSells / 10000).toFixed(1) + "万" : cSells;
    },
  },
};
</script>
<style scoped>
.shop_info {
  padding: 25px 5px;
  border-bottom: 5px solid #f2f5f8;
  color: #333;
}
.shop_logo {
  width: 45px;
  height: 45px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
}
.shop_name {
  margin-left: 10px;
}
.shop_middleInfo {
  display: flex;
  padding-top: 20px;
}
.middleInfo_item {
  width: 50%;
  text-align: center;
}
.middleInfo_l {
  display: flex;
  justify-content: space-around;
  margin: 10px 0 35px;
  border-right: 1px solid rgba(0, 0, 0, 0.1);
}
.count {
  font-size: 18px;
  height: 30px;
}
.text {
  font-size: 12px;
}
.middleInfo_r {
  font-size: 13px;
}
.r_item {
  height: 30px;
}
.score {
  width: 45px;
  padding: 0 10px 0 10px;
  display: inline-block;
  text-align: left;
  color: #5ea732;
}
.score_high {
  color: #f13e3a;
}
.degree {
  background-color: #5ea732;
  text-align: right;
  color: #fff;
}
.degree_high {
  background-color: #f13e3a;
}
.shop_enter {
  width: 150px;
  height: 30px;
  margin: 0 auto;
  background-color: #f2f5f8;
  border-radius: 10px;
  line-height: 30px;
  text-align: center;
  color: #666;
  font-size: 14px;
}
</style>
