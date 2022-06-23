<template>
  <div id="home">
    <nav-bar class="home_nav" ref="navBar">
      <template #center>购物街</template>
    </nav-bar>
    <!-- 复制tab-control,障眼法实现粘顶 -->
    <tab-control
      :titles="['流行', '新款', '精选']"
      @tabClick="tabClick"
      class="tab_control2"
      v-show="isShowTabControl"
      ref="tabControl2"
    />
    <scroll
      class="wrapper"
      ref="scroll"
      :probeType="3"
      @scroll="wrapperScroll"
      :pullUpLoad="true"
      @pullingUp="LoadMore"
    >
      <home-swiper :banner="banner" @imageLoad="swiperImageLoad" />
      <recommend-view :recommend="recommend" />
      <feature-view />
      <tab-control
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref="tabControl1"
      />
      <goods-list
        :goodsList="goods[currentType].list"
        @hImageLoad="goodsImageLoad"
      />
    </scroll>
    <back-top @click="backTop" v-show="isShowBackTop" />
  </div>
</template>
<script>
import NavBar from "components/common/navbar/NavBar";
import Scroll from "components/common/scroll/Scroll.vue";
import TabControl from "components/content/tabControl/TabControl.vue";
import GoodsList from "components/content/goods/GoodsList.vue";
import BackTop from "components/content/backTop/BackTop.vue";

import HomeSwiper from "./childCpns/HomeSwiper.vue";
import RecommendView from "./childCpns/RecommendView.vue";
import FeatureView from "./childCpns/FeatureView.vue";

import { getHomeMultidata, getHomeGoods } from "network/home.js";
import { goodsItemMixin } from "common/mixin.js";

export default {
  name: "home",
  mixins: [goodsItemMixin],
  components: {
    NavBar,
    Scroll,
    TabControl,
    GoodsList,
    BackTop,

    HomeSwiper,
    RecommendView,
    FeatureView,
  },
  data() {
    return {
      banner: [],
      recommend: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      isShowBackTop: false,
      tabControlOffsetTop: 0,
      isShowTabControl: false,
    };
  },
  created() {
    // 请求多个数据
    this.getHomeMultidata();
    // 请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  methods: {
    /**
     * 事件监听方法
     */
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      // 使复制tabControl与实际tabControl currentIndex相同
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    backTop() {
      this.$refs.scroll.scrollTo(0, 44);
    },
    wrapperScroll(position) {
      // 判断backTop是否显示
      this.isShowBackTop = -position.y > 950;
      // 判断复制tabControl是否显示
      this.isShowTabControl =
        -position.y >= this.tabControlOffsetTop - this.navBarHeight;
    },
    LoadMore() {
      // 滚动到底部再发送一次网络请求，获取新的数据
      this.getHomeGoods(this.currentType);
    },
    goodsImageLoad() {
      this.$refs.scroll.refresh();
    },
    swiperImageLoad() {
      // 计算tabControl距顶部距离
      this.tabControlOffsetTop = this.$refs.tabControl1.$el.offsetTop;
    },

    /**
     * 网络请求方法
     */
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        this.banner = res.data.banner.list;
        this.recommend = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;

        // 完成上拉加载
        this.$refs.scroll.finishPullUp();
      });
    },
  },
};
</script>
<style scoped>
#home {
  padding-top: 44px;
  height: 100vh;
}
.home_nav {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  background-color: #ff8198;
  color: #fff;
  font-size: 16px;
  z-index: 1;
}
.wrapper {
  height: calc(100% - 49px);
  overflow: hidden;
}
.tab_control2 {
  position: fixed;
  z-index: 1;
  background-color: #fff;
}
</style>
