import { debounce } from "common/utils.js";

export const goodsItemMixin = {
  data() {
    return {
      refresh: null,
      navBarHeight: 0,
    };
  },
  mounted() {
    this.refresh = debounce(this.$refs.scroll.refresh, 50);
    // 获取navbar高度
    this.navBarHeight = this.$refs.navBar.$el.clientHeight;
  },
};

// 显示AddCart
export const addCartMixin = {
  methods: {
    addCart() {
      const addCart = document.querySelector("#add_cart");
      const mask = document.querySelector("#mask");
      // 点击显示AddCart组件，并添加class
      addCart.style.display = "block";
      addCart.className = "animate__animated animate__slideInUp";
      // 显示遮挡层
      mask.style.display = "block";
      mask.className = "animate__animated animate__fadeIn";
    },
  },
};
// 关闭AddCart
export const closeAddCartMixin = {
  methods: {
    close() {
      // 添加动画
      const addCart = document.querySelector("#add_cart");
      const mask = document.querySelector("#mask");
      addCart.className = "animate__animated animate__slideOutDown";
      mask.className = "animate__animated animate__fadeOut";
      // 隐藏遮挡层
      setTimeout(() => {
        addCart.style.display = "none";
        mask.style.display = "none";
      }, 300);
    },
  },
};
