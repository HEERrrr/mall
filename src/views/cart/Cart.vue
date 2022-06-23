<template>
  <div id="cart">
    <cart-nav-bar @manageClick="manageClick()" />
    <scroll class="wrapper" ref="scroll">
      <cart-list-item @styleClick="styleClick" />
    </scroll>
    <cart-bottom :showDel="showDel" />
    <add-cart
      v-if="Object.keys(skuInfo).length"
      :skuInfo1="skuInfo"
      :styleIndex1="styleIndex"
      :sizeIndex1="sizeIndex"
      :proIndex="key"
      ref="addCart"
    />
    <masks @click="maskClick" />
  </div>
</template>

<script>
import Scroll from "components/common/scroll/Scroll.vue";
import AddCart from "components/content/addCart/AddCart.vue";
import Masks from "components/content/mask/Masks.vue";

import CartNavBar from "./childCpns/CartNavBar.vue";
import CartListItem from "./childCpns/CartListItem.vue";
import CartBottom from "./childCpns/CartBottom.vue";

import { closeAddCartMixin } from "common/mixin.js";
export default {
  name: "Cart",
  mixins: [closeAddCartMixin],
  components: {
    Scroll,
    AddCart,
    Masks,

    CartNavBar,
    CartListItem,
    CartBottom,
  },
  data() {
    return {
      showDel: false,
      skuInfo: {},
      styleIndex: -1,
      sizeIndex: -1,
      key: -1,
      price: 0,
    };
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
    styleClick(skuInfo, index, key) {
      this.skuInfo = skuInfo;

      // 拿到选中样式的索引
      this.styleIndex =
        this.$store.state.cartList[index].products[key].style.styleIndex;
      this.sizeIndex =
        this.$store.state.cartList[index].products[key].size.sizeIndex;
      this.key = key;
      this.price = this.$store.state.cartList[index].products[key].price;

      setTimeout(() => {
        this.$refs.addCart.judgeStock();
      }, 1);
    },
    maskClick() {
      this.close();
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
