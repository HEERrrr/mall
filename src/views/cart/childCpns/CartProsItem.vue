<template>
  <div>
    <div class="products" v-for="(value, key) in cartItem.products" :key="key">
      <div class="products_item" @click="proItemClick(index, key)">
        <cart-choose
          :chooseClass="$store.state.cartList[index].products[key].proChecked"
          @click.native.stop="proCheckedClick(index, key)"
        />
        <div class="products_img">
          <img :src="value.img" alt="" />
        </div>
        <div class="products_info">
          <h5 class="title">{{ value.title }}</h5>
          <div>
            <div class="style">
              <div style="overflow: hidden">
                {{ value.styleName }};{{ value.sizeName }}
              </div>
            </div>
          </div>
          <div>
            <div class="stock" v-if="value.stock <= 100">库存紧张</div>
          </div>
          <span class="price">{{ value.price }}</span>
          <div class="count">
            <span class="left" @click.stop="decrement(index, key)">-</span>
            <span class="number">{{ value.count }}</span>
            <span class="right" @click.stop="increment(index, key)">+</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import CartChoose from "./CartChoose.vue";
export default {
  name: "CartProsItem",
  components: { CartChoose },
  props: {
    cartItem: {
      type: Object,
    },
    index: {
      type: Number,
    },
  },
  data() {
    return {
      iid: String,
    };
  },
  methods: {
    decrement(index, key) {
      const count = this.$store.state.cartList[index].products[key].count;
      // 数量等于1时点击给出相应提示
      if (count <= 1) {
        this.setAlertText("该宝贝不能减少了哟~");
      } else this.$store.getters.decreCount(index, key);
    },
    increment(index, key) {
      const count = this.$store.state.cartList[index].products[key].count;
      const stock = this.$store.state.cartList[index].products[key].stock;
      // 数量等于库存时给出相应提示
      if (count === stock) {
        this.setAlertText("超出购买数量~");
      } else this.$store.getters.increCount(index, key);
    },
    // 点击商品进入其详情页
    proItemClick(index, key) {
      this.iid = this.$store.state.cartList[index].products[key].iid;
      this.$router.push("/detail/" + this.iid);
    },
    // 商品选中
    proCheckedClick(index, key) {
      this.$store.dispatch("ProChecked", { index, key });
    },
  },
};
</script>
<style scoped>
.products {
  display: flex;
  overflow: hidden;
}
.products_item {
  display: flex;
  width: 100%;
  margin: 5px 0;
}
.products .choose {
  margin: 35px 10px 35px 0;
}
.products_img {
  width: 110px;
  height: 110px;
  min-width: 110px;
  border-radius: 10px;
  overflow: hidden;
}
.products_img img {
  width: 100%;
}
.products_info {
  flex: 6;
  padding: 3px 0 0 10px;
  overflow: hidden;
}
.products_info .title {
  position: relative;
  white-space: nowrap;
  font-family: "楷体";
  color: #000;
}
.products_info .style {
  position: relative;
  display: inline-block;
  max-width: 100%;
  margin: 10px 0;
  padding: 3px 5px;
  border-radius: 3px;
  background-color: rgba(100, 100, 100, 0.1);
  box-shadow: 1px -1px rgba(0, 0, 0, 0.1);
  white-space: nowrap;
  font-family: "楷体";
  font-size: 14px;
  color: #666;
}
.products_info .stock {
  display: inline-block;
  margin-bottom: 10px;
  padding: 0 3px;
  border: 1px solid #f33409;
  border-radius: 3px;
  font-size: 12px;
  color: #f33409;
}
.products_info .price {
  height: 25px;
  line-height: 25px;
  font-size: 18px;
  color: #ff5777;
}
.products_info .count {
  display: flex;
  float: right;
  height: 25px;
  width: 90px;
  border: 2px solid rgba(100, 100, 100, 0.2);
  border-radius: 5px;
  line-height: 23px;
  text-align: center;
  color: #999;
  z-index: 2;
}
.count .left,
.count .right {
  flex: 1;
  font-size: 20px;
}
.count .left {
  line-height: 20px;
}
.count .number {
  flex: 1.5;
  border: 2px solid rgba(100, 100, 100, 0.2);
  border-top: 0;
  border-bottom: 0;
}
</style>
