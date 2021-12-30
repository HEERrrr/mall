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
