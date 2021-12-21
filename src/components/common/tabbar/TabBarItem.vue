<template>
  <div class="tabbar_item" @click="itemClick" :style="activeStyle">
    <div class="iconfont"><slot name="item_icon"></slot></div>
    <slot name="item_text"></slot>
  </div>
</template>
<script>
export default {
  name: "TabBarItems",
  props: {
    path: String,
    activeColor: {
      type: String,
      default: "red",
    },
  },
  methods: {
    itemClick() {
      this.$router.push(this.path);
    },
  },
  computed: {
    activeStyle() {
      return this.$route.path == this.path ? { color: this.activeColor } : {};
    },
  },
};
</script>
<style scoped>
.tabbar_item {
  flex: 1;
  font-size: 14px;
}
.iconfont {
  font-size: 24px;
  margin-top: 3px;
}
</style>
