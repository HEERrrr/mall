<template>
  <nav-bar>
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
  },
};
</script>
<style scoped>
.center {
  font-size: 13px;
}
</style>
