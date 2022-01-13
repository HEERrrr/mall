<template>
  <div id="mask"></div>
</template>
<script>
export default {
  name: "Masks",
};
</script>
<style scoped>
#mask {
  display: none;
  position: absolute;
  top: 0;
  height: 100vh;
  width: 100vw;
  background-color: rgba(100, 100, 100, 0.3);
  z-index: 1;
}
</style>
