<template>
  <div class="navbar">
    <div class="left">
      <slot name="left" v-if="$route.meta.showLeft"></slot>
    </div>
    <div class="center"><slot name="center"></slot></div>
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>
<script>
export default {
  name: "NavBar",
};
</script>
<style scoped>
.navbar {
  display: flex;
  box-shadow: 0 1px 1px rgba(100, 100, 100, 0.1);
  height: 44px;
  line-height: 44px;
  text-align: center;
}
.left,
.right {
  width: 60px;
}
.center {
  flex: 1;
}
</style>
