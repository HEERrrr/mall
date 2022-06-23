<template>
  <scroll class="wrapper">
    <div class="top">
      <div class="item" v-for="(item, index) in categoryList" :key="index">
        <img :src="item.image" alt="" />
        <span class="title">{{ item.title }}</span>
      </div>
    </div>
    <div class="detail">
      <tab-control :titles="['流行', '新款', '精选']" v-bind="$attrs" />
      <goods-list :goodsList="categoryDetail" />
    </div>
  </scroll>
</template>
<script>
import Scroll from "components/common/scroll/Scroll.vue";
import TabControl from "components/content/tabControl/TabControl.vue";
import GoodsList from "components/content/goods/GoodsList.vue";
export default {
  name: "CategoryList",
  components: {
    Scroll,
    TabControl,
    GoodsList,
  },
  // inheritAttrs: false,
  props: {
    categoryList: Array,
    categoryDetail: Object,
  },
};
</script>
<style scoped>
.wrapper {
  height: calc(100vh - 93px);
}
.top {
  display: flex;
  flex-wrap: wrap;
  padding: 5px 0;
}
.item {
  width: 50%;
  padding: 10px 30px;
}
.item img {
  width: 100%;
}
.item .title {
  display: block;
  text-align: center;
  margin-top: 8px;
}
</style>
