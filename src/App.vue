<template>
  <div>
    <router-view v-slot="{ Component }">
      <keep-alive exclude="Detail">
        <component :is="Component" />
      </keep-alive>
    </router-view>
    <main-tab-bar />
  </div>
</template>
<script>
import MainTabBar from "components/content/mainTabbar/MainTabBar";
export default {
  name: "App",
  data() {
    return {};
  },
  components: {
    MainTabBar,
  },
  methods: {},
};
</script>
<style scoped>
@import "assets/css/base.css";
</style>
