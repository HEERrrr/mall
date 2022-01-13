<template>
  <div class="bottom">
    <div class="btm_left" @click="allChecked">
      <cart-choose :chooseClass="$store.state.allChecked" />
      <span>全选</span>
    </div>
    <div class="btm_right">
      <div v-if="!showDel">
        合计:<span class="price">{{ totalPrice }}</span>
        <div class="settle" @click="settleClick">结算</div>
      </div>
      <div class="delete" v-else @click="delClick">删除</div>
    </div>
  </div>
</template>
<script>
import Alert from "components/content/alert/Alert.vue";
import CartChoose from "./CartChoose.vue";
import { alertMixin } from "common/mixin.js";
export default {
  components: {
    CartChoose,
    Alert,
  },
  name: "CartBottom",
  mixins: [alertMixin],
  props: {
    showDel: {
      type: Boolean,
    },
    alert: {
      type: Object,
    },
  },
  data() {
    return {
      unchecked: [],
    };
  },
  computed: {
    totalPrice() {
      return this.$store.getters.getTotalPrice;
    },
  },
  methods: {
    allChecked() {
      if (this.$store.state.cartList.length === 0) {
        this.setAlertText("购物车内还没有宝贝哦~");
      } else this.$store.dispatch("AllChecked");
    },
    bottomAlert() {
      const cartList = this.$store.state.cartList;
      this.unchecked = [];

      if (cartList.length === 0) {
        this.setAlertText("购物车内还没有宝贝哦~");
      } else {
        for (let i in this.$store.state.cartList) {
          if (cartList[i].proCheckedNum === 0) {
            this.unchecked.push(i);
          }
        }
        if (this.unchecked.length === cartList.length)
          // 没有商品选中
          this.setAlertText("您还没有选择宝贝哦!");
        else return true;
      }
    },
    settleClick() {
      this.bottomAlert();
    },
    delClick() {
      // 选中商品后Mask以及Alert出现
      if (this.bottomAlert()) {
        const mask = document.querySelector("#mask");
        mask.style.display = "block";
        mask.className = "animate__animated animate__fadeIn";
        this.alert.judgeClass.in = true;
        this.alert.showDel = true;
      }
    },
  },
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
