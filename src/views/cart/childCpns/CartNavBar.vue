<template>
  <nav-bar class="navbar">
    <template #left>
      <span class="iconfont" @click="leftClick">&#xe681;</span>
    </template>
    <template #center>购物车({{ getTotalCount }})</template>
    <template #right
      ><span
        class="nav_right"
        :class="{ manage: changeManage }"
        @click="manageClick"
        >管理</span
      ></template
    >
  </nav-bar>
</template>
<script>
import NavBar from "components/common/navbar/NavBar";
export default {
  name: "CartNavBar",
  components: {
    NavBar,
  },
  data() {
    return {
      changeManage: false,
    };
  },
  computed: {
    // 购物车商品总数
    getTotalCount() {
      const state = this.$store.state;
      state.totalCount = 0;
      for (let i in state.cartList) {
        state.totalCount += state.cartList[i].products.length;
      }
      return state.totalCount;
    },
  },
  methods: {
    // navbar左箭头
    leftClick() {
      this.$router.back();
    },
    manageClick() {
      this.changeManage = !this.changeManage;
      this.$emit("manageClick");
    },
  },
};
</script>
<style scoped>
.navbar {
  background-color: #ff8198;
  font-weight: bold;
  font-size: 18px;
  color: #000;
}
.nav_right {
  font-size: 12px;
  color: #333;
}
.manage {
  margin-right: 5px;
  padding: 2px 2px 2px 5px;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.7);
  color: #f72803;
  font-family: "楷体";
  font-size: 14px;
}
.manage::after {
  content: "×";
  font-size: 12px;
}
</style>
