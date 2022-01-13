<template>
  <nav-bar class="navbar">
    <template #left>
      <span class="iconfont" @click="leftClick">&#xe681;</span>
    </template>
    <template #center>
      <tab-control
        :titles="['商品', '参数', '评论', '推荐']"
        :borderColor="'transparent'"
        class="center"
        v-bind="$attrs"
        ref="tab"
      />
    </template>
    <template #right
      ><i class="iconfont right" @click="rightClick">&#xe70b;</i></template
    >
  </nav-bar>
</template>
<script>
import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl";

export default {
  name: "DetailNavBar",
  components: {
    NavBar,
    TabControl,
  },
  // v-bind="$attrs"+此属性设置，使TabControl略过此组件，直接向Detail发送事件
  inHeritAttrs: false,
  methods: {
    leftClick() {
      this.$router.back();
    },
    rightClick() {
      this.$router.push("/cart");
    },
  },
};
</script>
<style scoped>
.navbar {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 1;
  background-color: #f6f6f6;
}
.center {
  font-size: 13px;
}
.right {
  font-size: 18px;
}
</style>
