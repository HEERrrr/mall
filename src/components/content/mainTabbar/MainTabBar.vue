<template>
  <div>
    <tab-bar>
      <tab-bar-item path="/home">
        <template #item_icon>&#xe639;</template>
        <template #item_text>首页</template>
      </tab-bar-item>
      <tab-bar-item path="/category">
        <template #item_icon>&#xe600;</template>
        <template #item_text>分类</template>
      </tab-bar-item>
      <tab-bar-item path="/cart">
        <template #item_icon>&#xe70b;</template>
        <template #item_text>购物车</template>
      </tab-bar-item>
      <tab-bar-item path="/profile">
        <template #item_icon>&#xe75e;</template>
        <template #item_text>我的</template>
      </tab-bar-item>
    </tab-bar>
  </div>
</template>
<script>
import TabBar from "components/common/tabbar/TabBar.vue";
import TabBarItem from "components/common/tabbar/TabBarItem.vue";
export default {
  name: "MainTabBar",
  components: { TabBar, TabBarItem },
};
</script>
<style scoped></style>
