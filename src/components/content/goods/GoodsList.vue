<template>
  <div class="goods_list">
    <goods-list-item
      v-for="item in goodsList"
      :key="item"
      :goodsItem="item"
      v-bind="$attrs"
    />
  </div>
</template>
<script>
import GoodsListItem from "./GoodsListItem.vue";

export default {
  name: "GoodsList",
  props: {
    goodsList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  // GoodsListItem发送自定义事件到Home，需设置此属性
  inheritAttrs: false,
  components: {
    GoodsListItem,
  },
};
</script>
<style scoped>
.goods_list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 2px;
}
</style>
