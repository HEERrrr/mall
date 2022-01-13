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

// Alter动画
export const alertMixin = {
  mounted() {
    if (this.$refs.alert) this.alert = this.$refs.alert;
  },
  methods: {
    animate() {
      const judgeClass = this.alert.judgeClass;
      // Alert 出现动画 开启
      judgeClass.in = true;
      // 当频繁点击 - 时,清除定时器,使Alert一直显示,直到不再点击
      if (judgeClass.timer1 || judgeClass.timer2) {
        clearTimeout(judgeClass.timer1);
        clearTimeout(judgeClass.timer2);
      }
      judgeClass.timer1 = setTimeout(() => {
        // Alert 消失动画 开启
        judgeClass.out = true;
      }, 2000);
      judgeClass.timer2 = setTimeout(() => {
        // 关闭两个动画
        judgeClass.in = judgeClass.out = false;
      }, 2500);
    },
    // 设置Alert显示文字并开启动画
    setAlertText(text) {
      // 商品添加成功时的提示信息消失时，才能开启下一个动画
      if (!this.alert.showIcon) {
        this.alert.alertText = text;
        this.animate();
      }
    },
  },
};
