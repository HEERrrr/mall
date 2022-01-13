<template>
  <div id="cart">
    <cart-nav-bar @manageClick="manageClick()" />
    {{ $store.getters.getTotalCount }}
    <scroll class="wrapper" ref="scroll">
      <cart-list-item />
    </scroll>
    <cart-bottom :showDel="showDel" :alert="alert" />
    <alert ref="alert"></alert>
    <masks />
  </div>
</template>

<script>
import Scroll from "components/common/scroll/Scroll.vue";
import Alert from "components/content/alert/Alert.vue";
import Masks from "components/content/mask/Masks.vue";

import CartNavBar from "./childCpns/CartNavBar.vue";
import CartListItem from "./childCpns/CartListItem.vue";
import CartBottom from "./childCpns/CartBottom.vue";

export default {
  name: "Cart",
  components: {
    Scroll,
    Alert,
    Masks,

    CartNavBar,
    CartListItem,
    CartBottom,
  },
  data() {
    return {
      showDel: false,
      alert: null,
    };
  },
  mounted() {
    this.alert = this.$refs.alert;
  },
  activated() {
    this.$refs.scroll.refresh();
  },
  beforeRouteEnter(to, from) {
    // 如果从detail页面进入,显示 navbar ← 箭头
    if (from.path.indexOf("detail") !== -1) {
      to.meta.showLeft = true;
    }
  },
  methods: {
    manageClick() {
      this.showDel = !this.showDel;
    },
  },
};
</script>

<style scoped>
.wrapper {
  height: calc(100vh - 143px);
  background-color: rgba(100, 100, 100, 0.1);
  overflow: hidden;
}
</style>
