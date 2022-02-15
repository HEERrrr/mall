<template>
  <div>
    <div
      class="cartList"
      v-for="(item, index) in $store.state.cartList"
      :key="index"
    >
      <div class="cart_item">
        <div class="top">
          <cart-choose
            :index="index"
            :chooseClass="$store.state.cartList[index].shopChecked"
            @click="shopCheckedClick(index)"
          />
          <h4 class="shopName">
            <i class="iconfont">&#xe707;</i>
            {{ item.shopName }}
          </h4>
        </div>
        <cart-pros-item :cartItem="item" :index="index" v-bind="$attrs" />
      </div>
    </div>
  </div>
</template>
<script>
import CartProsItem from "./CartProsItem.vue";
import CartChoose from "./CartChoose.vue";
export default {
  name: "CartListItem",
  inheritAttrs: false,
  components: {
    CartProsItem,
    CartChoose,
  },
  methods: {
    // 商品选中
    shopCheckedClick(index) {
      this.$store.dispatch("ShopChecked", index);
    },
  },
};
</script>
<style scoped>
.cartList {
  padding: 15px 5px 5px;
}
.cart_item {
  padding: 15px 10px 5px;
  background-color: #fff;
  border-radius: 15px;
}
.top {
  display: flex;
  margin-bottom: 5px;
}

.top .shopName {
  margin: 0;
  font-family: "楷体";
  color: #000;
}
.shopName .iconfont {
  color: #f25b0a;
  font-size: 18px;
}
</style>
