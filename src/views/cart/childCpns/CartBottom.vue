<template>
  <div class="bottom">
    <div class="btm_left" @click="allChecked">
      <cart-choose :chooseClass="$store.state.allChecked" />
      <span>全选</span>
    </div>
    <div class="btm_right">
      <div v-if="!showDel">
        合计:<span class="price">{{ getTotalPrice }}</span>
        <div class="settle" @click="settleClick">结算</div>
      </div>
      <div class="delete" v-else @click="delClick">删除</div>
    </div>
  </div>
</template>
<script>
import CartChoose from "./CartChoose.vue";
export default {
  components: {
    CartChoose,
  },
  name: "CartBottom",
  props: {
    showDel: {
      type: Boolean,
    },
  },
  computed: {
    // 选中商品总价格
    getTotalPrice() {
      const state = this.$store.state;
      // state.totalPrice = 0;
      let totalPrice = 0;
      for (let i in state.cartList) {
        for (let k in state.cartList[i].products) {
          if (state.cartList[i].products[k].proChecked) {
            totalPrice +=
              state.cartList[i].products[k].price.slice(1) *
              state.cartList[i].products[k].count;
          }
        }
      }
      return totalPrice;
    },
  },
  created() {
    // 监测到toast中confirmDel改变,将选中数据删除
    this.$toast.$watch("confirmDel", () => {
      this.$store.dispatch("queryChecked");
    });
  },
  methods: {
    // 如果购物车为空给出提示信息,否则全选
    allChecked() {
      if (this.$store.state.cartList.length === 0) {
        this.$toast.setNormalText("购物车内还没有宝贝哦~");
      } else this.$store.dispatch("AllChecked");
    },
    // 判断购物车是否为空？是否选中商品？
    setNormalText() {
      const cartList = this.$store.state.cartList;
      let unchecked = [];

      if (cartList.length === 0) {
        this.$toast.setNormalText("购物车内还没有宝贝哦~");
      } else {
        for (let i in this.$store.state.cartList) {
          if (cartList[i].proCheckedNum === 0) unchecked.push(i);
        }
        return unchecked.length === cartList.length
          ? this.$toast.setNormalText("您还没有选择宝贝哦!")
          : true;
      }
    },
    // 点击结算
    settleClick() {
      this.setNormalText();
    },
    // 点击删除
    delClick() {
      let checkedNum = 0;
      // 判断选中商品的数量
      for (let i in this.$store.state.cartList) {
        checkedNum += this.$store.state.cartList[i].proCheckedNum;
      }
      // 只有选择商品时才会出现删除弹框
      this.setNormalText() &&
        this.$toast.setDelContent("确定将这 " + checkedNum + " 个宝贝删除？");
    },
  },
  // watch: {},
};
</script>
<style scoped>
.bottom {
  width: 100%;
  height: 50px;
  padding: 0 10px;
}
.btm_left,
.btm_right {
  position: relative;
  height: 50px;
  line-height: 50px;
  font-size: 12px;
}
.btm_left {
  float: left;

  color: #999;
}
.btm_left .choose {
  position: absolute;
  top: 50%;
  margin-top: -10px;
}
.btm_left span {
  margin-left: 25px;
}
.btm_right {
  float: right;
}
.btm_right .price::before {
  content: "￥";
  font-size: 12px;
  color: #ff5777;
}
.btm_right .price {
  font-size: 18px;
  color: #ff5777;
}
.btm_right .settle,
.btm_right .delete {
  float: right;
  width: 80px;
  height: 35px;
  line-height: 30px;
  margin-top: 7px;
  margin-left: 10px;
  line-height: 15px;
  padding: 10px 0;
  border-radius: 15px;
  text-align: center;
  color: #fff;
  font-size: 16px;
}
.btm_right .settle {
  background: linear-gradient(to right, #f86618 50%, rgba(245, 44, 8, 0.945));
}
.btm_right .delete {
  background: #ff0000;
}
</style>
