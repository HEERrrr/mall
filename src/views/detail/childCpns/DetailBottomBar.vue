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
export default {
  components: { TabBar, TabBarItem },
  name: "DetailBottomBar",
  methods: {
    addCart() {
      const addCart = document.querySelector("#add_cart");
      const mask = document.querySelector("#mask");
      // 点击显示AddCart组件，并添加class
      addCart.style.display = "block";
      addCart.className = "animate__animated animate__slideInUp";
      // 显示遮挡层
      mask.style.display = "block";
      mask.className = "animate__animated animate__fadeIn";
    },
  },
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
