<template>
  <tab-bar>
    <tab-bar-item>
      <template #item_icon><div class="shop">&#xe602;</div></template>
      <template #item_text>店铺</template>
    </tab-bar-item>
    <tab-bar-item>
      <template #item_icon>&#xe618;</template>
      <template #item_text>客服</template>
    </tab-bar-item>
    <tab-bar-item>
      <template #item_icon>&#xe8b9;</template>
      <template #item_text>收藏</template>
    </tab-bar-item>
    <tab-bar-item class="shopcar" @click="addCart">
      <template #item_text>加入购物车</template>
    </tab-bar-item>
    <tab-bar-item class="buy">
      <template #item_text>购买</template>
    </tab-bar-item>
  </tab-bar>
</template>
<script>
import TabBar from "components/common/tabbar/TabBar.vue";
import TabBarItem from "components/common/tabbar/TabBarItem.vue";
import { addCartMixin } from "common/mixin.js";
export default {
  components: { TabBar, TabBarItem },
  name: "DetailBottomBar",
  mixins: [addCartMixin],
};
</script>
<style scoped>
.shop {
  color: #ff5777;
}
.shopcar,
.buy {
  height: 49px;
  line-height: 44px;
}
.shopcar {
  padding: 0 5px;
  background-color: #f6e115;
}
.buy {
  background-color: #ec7ca3;
  color: #fff;
}
</style>
