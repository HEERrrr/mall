<template>
  <div id="add_cart" v-if="Object.keys(skuInfo).length !== 0">
    <div class="top">
      <div class="top_img">
        <img :src="skuInfo.topImg" />
      </div>
      <div class="price">{{ skuInfo.price }}</div>
      <i class="iconfont close" @click="close">&#xe6a7;</i>
    </div>
    <div class="style">
      <p>{{ skuInfo.styleKey }}分类({{ skuInfo.style.length }})</p>
      <div
        v-for="(item, index) in skuInfo.style"
        :key="index"
        class="item"
        :class="{ active: styleIndex === index }"
        @click="styleClick(index)"
      >
        <span>{{ item.name }}</span>
      </div>
    </div>
    <div class="size">
      <p>{{ skuInfo.sizeKey }}</p>
      <div
        v-for="(item, index) in skuInfo.size"
        :key="index"
        class="item"
        :class="{ active: sizeIndex === index }"
        @click="sizeClick(index)"
      >
        <span>{{ item.name }}</span>
      </div>
    </div>
    <div class="amount">
      <span>购买数量</span>
      <span class="stock" :style="{ color: stockTextColor }">{{
        stock.text
      }}</span>
      <div class="count">
        <button @click="decrement">-</button>
        <button class="number">{{ count }}</button>
        <button @click="increment">+</button>
      </div>
    </div>
    <div class="confirm" @click="confirmClick" :style="confirmClass">确认</div>
  </div>
</template>
<script>
import { closeAddCartMixin } from "common/mixin.js";
export default {
  name: "AddCart",
  mixins: [closeAddCartMixin],
  props: {
    skuInfo: {
      type: Object,
    },
    styleIndex1: {
      type: Number,
    },
    sizeIndex1: {
      type: Number,
    },
  },
  data() {
    return {
      count: 1,
      cartCount: 0,
      styleIndex: -1,
      sizeIndex: -1,
      currency: "￥",
      stock: {
        num: Number,
        text: "有货",
      },
      stockTextColor: "#999",
      timer: null,
    };
  },
  // style(size)Index跟随传入的style(size)Index1改变
  watch: {
    styleIndex1() {
      this.styleIndex = this.styleIndex1;
    },
    sizeIndex1() {
      this.sizeIndex = this.sizeIndex1;
    },
  },
  methods: {
    // 设置此时库存信息以及数量
    setStockStyle(text, count, color) {
      this.stock.text = text;
      this.count = count;
      this.stockTextColor = color;
    },
    // 判断库存状态并改变相应信息
    judgeStock() {
      const skus = this.skuInfo.skus;
      for (let i in skus) {
        if (skus[i].styleId === this.styleIndex + 1) {
          // 选中'颜色分类'更改顶部图片
          this.skuInfo.topImg = skus[i].img;
          // 同时选中颜色分类+尺码 显示对应库存
          if (skus[i].sizeId - 100 === this.sizeIndex) {
            this.skuInfo.price = skus[i].currency + skus[i].nowprice / 100;
            if (skus[i].stock === 0) {
              this.stock.num = 0;
              this.setStockStyle("缺货", 0, "#ff5777");
            } else if (skus[i].stock <= 100) {
              this.stock.num = skus[i].stock;
              this.setStockStyle("库存紧张 : " + skus[i].stock, 1, "#ff5777");
            } else {
              this.stock.num = skus[i].stock;
              this.setStockStyle("有货", 1, "#999");
            }
          }
        }
      }
    },
    // 判断选中样式商品是否在购物车中，以及购物车中的数量是否已达最大
    judgeCartCountMax() {
      const cartList = this.$store.state.cartList;
      // 在购物车列表查找
      const cartItem = cartList.find(
        item => item.shopName === this.skuInfo.shopName
      );
      if (cartItem) {
        const index = cartList.indexOf(cartItem);
        // 在找到的商品里查找其中是否有当前选中的样式
        const productsItem = cartItem.products.find(
          item =>
            item.style.styleName === this.skuInfo.style[this.styleIndex].name &&
            item.size.sizeName === this.skuInfo.size[this.sizeIndex].name
        );
        if (productsItem) {
          // 拿到选中样式商品在products中的索引号
          const key = cartItem.products.indexOf(productsItem);
          // 如果购物车内此商品的数量已达库存最大,保持count=0
          if (cartList[index].products[key].count === this.stock.num) {
            this.count = 0;
          }
          this.cartCount = cartList[index].products[key].count;
        } else this.cartCount = 0;
      }
    },
    styleClick(index) {
      // 未选中时取消active样式,并更改显示的库存信息;更改顶部图片,价格为默认
      if (this.styleIndex === index) {
        this.styleIndex = -1;
        this.setStockStyle("有货", 1, "#999");
        this.skuInfo.topImg = this.skuInfo.defaultImg;
        this.skuInfo.price = this.skuInfo.defaultPrice;
      } else {
        this.styleIndex = index;
        if (this.sizeIndex !== -1) {
          this.judgeStock();
          // 每次选中都判断一下已添加在购物车中？数量达到库存最大？
          // 保证购物车中的数量已达库存最大时，此页面count=0
          this.judgeCartCountMax();
        }
      }
    },
    sizeClick(index) {
      // 未选中时取消active样式,并更改显示的库存信息;更改价格为默认价格
      if (this.sizeIndex === index) {
        this.sizeIndex = -1;
        this.setStockStyle("有货", 1, "#999");
        this.skuInfo.price = this.skuInfo.defaultPrice;
      } else {
        this.sizeIndex = index;
        if (this.styleIndex !== -1) {
          this.judgeStock();
          this.judgeCartCountMax();
        }
      }
    },
    // 减少购买数量的方法
    decrement() {
      if (this.count <= 1) {
        this.count = this.count;
        this.$toast.setNormalText("数量低于范围~");
      } else this.count--;
    },
    // 增加购买数量的方法
    increment() {
      this.judgeCartCountMax();
      if (this.count + this.cartCount === this.stock.num) {
        if (this.cartCount === 0) {
          this.$toast.setNormalText("数量超出范围~");
        } else {
          this.$toast.setNormalText("库存不足,请先处理购物车内此商品~");
        }
      } else ++this.count;
    },
    // 没有选择颜色/尺码或者缺货时,给出提示信息
    confirmClick() {
      if (this.styleIndex === -1) {
        this.sizeIndex === -1
          ? this.$toast.setNormalText("请选择 颜色分类 尺码")
          : this.$toast.setNormalText("请选择 颜色分类");
      } else {
        if (this.sizeIndex === -1) {
          this.$toast.setNormalText("请选择 尺码");
        }
        // 颜色尺码都选中
        else {
          if (this.count === 0) {
            this.stock.text == "缺货"
              ? this.$toast.setNormalText("该商品暂时缺货")
              : this.$toast.setNormalText("库存不足,请先处理购物车内此商品~");
          } else {
            this.addPurchaseInfo();
            this.close();
            // 添加成功的提示信息
            this.$toast.setNormalText("添加成功,在购物车等您~", true);
            // 判断购物车数量，与库存对比
            this.judgeCartCountMax();
            if (this.count === this.stock.num) {
              this.count = 0;
            } else if (this.count + this.cartCount > this.stock.num) {
              this.count = 1;
            } else this.count += 0;
          }
        }
      }
    },
    addPurchaseInfo() {
      // 将商品加入vuex的购物车列表
      this.$store.dispatch("addPurchaseInfo", {
        shopName: this.skuInfo.shopName,
        shopChecked: false,
        proCheckedNum: 0,
        products: [
          {
            iid: this.skuInfo.iid,
            img: this.skuInfo.topImg,
            title: this.skuInfo.title,
            style: {
              styleIndex: this.styleIndex,
              styleName: this.skuInfo.style[this.styleIndex].name,
            },
            size: {
              sizeIndex: this.sizeIndex,
              sizeName: this.skuInfo.size[this.sizeIndex].name,
            },
            price: this.skuInfo.price,
            count: this.count,
            stock: this.stock.num,
            proChecked: false,
          },
        ],
      });
    },
  },
  computed: {
    confirmClass() {
      // 缺货/购物车中商品数量已达库存最大量时改变确认按钮样式
      if (this.count === 0) {
        return { backgroundColor: "#999696" };
      }
    },
  },
};
</script>
<style scoped>
#add_cart {
  position: absolute;
  top: 70px;
  display: none;
  width: 100vw;
  height: calc(100vh - 70px);
  padding: 10px;
  z-index: 2;
  background-color: #f9f9f9;
}
.animate__slideInUp {
  animation-duration: 0.3s;
}
.animate__slideOutDown {
  animation-duration: 0.3s;
}
.top {
  position: relative;
}
.top,
.style,
.size {
  padding-bottom: 10px;
  border-bottom: 1px solid #e8eaee;
}
.top .top_img {
  width: 60px;
  height: 60px;
  border-radius: 3px;
  overflow: hidden;
}
.top_img img {
  width: 100%;
}
.top .price {
  position: absolute;
  top: 5px;
  left: 70px;
  font-size: 20px;
  color: #ff5777;
}
.top .close {
  position: absolute;
  top: 5px;
  right: 0;
  font-size: 20px;
}
.style,
.size {
  padding-top: 10px;
  font-size: 15px;
}
.item {
  display: inline-block;
  max-width: 90vh;
  padding: 5px 15px;
  margin: 10px 10px 0 0;
  background-color: #f2f2f2;
  border: 1px solid transparent;
  border-radius: 5px;
  font-size: 13px;
}
.active {
  border-color: #ff5777;
}
.amount {
  padding-top: 10px;
}
.amount .stock {
  margin-left: 5px;
  color: #999;
  font-size: 13px;
}
.count {
  float: right;
}
.count button {
  display: inline-block;
  width: 25px;
  height: 25px;
  margin-left: 2px;
  border: none;
  border-radius: 3px;
  line-height: 25px;
  background-color: #f1f1f1;
  text-align: center;
  color: #b1aeae;
}
.count .number {
  color: #666;
}
.confirm {
  position: absolute;
  bottom: 5px;
  left: 10px;
  right: 10px;
  height: 35px;
  background-color: #ff1e00;
  border-radius: 20px;
  line-height: 35px;
  text-align: center;
  color: #fff;
  font-size: 15px;
}
</style>
