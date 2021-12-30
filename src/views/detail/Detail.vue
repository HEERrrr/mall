<template>
  <div id="detail">
    <detail-nav-bar
      class="detail_navBar"
      @tabClick="tabClick"
      :ParentCurrentIndex="currentIndex"
      ref="navBar"
    />
    <scroll
      class="wrapper"
      ref="scroll"
      :probeType="3"
      @scroll="scroll"
      :pullUpLoad="true"
      @pullingUp="noMore"
    >
      <detail-swiper :topImages="topImages" />
      <detail-base-info :baseInfo="baseInfo" />
      <detail-shop-info :shopInfo="shopInfo" />
      <detail-goods-info :goodsInfo="goodsInfo" @imageLoad="goodsImageLoad" />
      <detail-params-info :paramsInfo="paramsInfo" ref="paramsInfo" />
      <detail-rate-info :rateInfo="rateInfo" ref="rateInfo" />
      <goods-list
        :goodsList="recommend"
        ref="recommend"
        @dImageLoad="goodsItemImageLoad"
      />
      <div class="no_more" v-if="isShowNoMore">已经到底了 O_O</div>
    </scroll>
    <bottom-bar />
  </div>
</template>
<script>
import Scroll from "components/common/scroll/Scroll";
import BottomBar from "components/content/bottomBar/BottomBar.vue";
import GoodsList from "components/content/goods/GoodsList.vue";

import DetailNavBar from "views/detail/childCpns/DetailNavBar";
import DetailSwiper from "views/detail/childCpns/DetailSwiper";
import DetailBaseInfo from "views/detail/childCpns/DetailBaseInfo";
import DetailShopInfo from "views/detail/childCpns/DetailShopInfo";
import DetailGoodsInfo from "views/detail/childCpns/DetailGoodsInfo";
import DetailParamsInfo from "views/detail/childCpns/DetailParamsInfo";
import DetailRateInfo from "views/detail/childCpns/DetailRateInfo.vue";

import {
  getDetail,
  getRecommend,
  BaseInfo,
  ShopInfo,
  GoodsInfo,
  ParamsInfo,
  RateInfo,
} from "network/detail.js";
import { goodsItemMixin } from "common/mixin.js";

export default {
  name: "Detail",
  mixins: [goodsItemMixin],
  components: {
    Scroll,
    BottomBar,
    GoodsList,

    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamsInfo,
    DetailRateInfo,
  },
  data() {
    return {
      iid: null,
      topImages: [],
      baseInfo: {},
      shopInfo: {},
      goodsInfo: {},
      paramsInfo: {},
      rateInfo: {},
      recommend: [],
      position: {
        goods: 0,
        params: 0,
        rate: 0,
        recommend: 0,
      },
      currentIndex: 0,
      isShowNoMore: false,
    };
  },
  created() {
    this.iid = this.$route.params.iid;
    // 请求数据
    getDetail(this.iid).then(res => {
      const data = res.result;
      // 获取轮播图 图片信息
      this.topImages = data.itemInfo.topImages;
      // 获取商品基本信息
      this.baseInfo = new BaseInfo(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      // 获取店铺信息
      this.shopInfo = new ShopInfo(data.shopInfo);
      // 获取商品详情信息
      this.goodsInfo = new GoodsInfo(data.detailInfo);
      // 获取商品参数尺码信息
      this.paramsInfo = new ParamsInfo(data.itemParams);
      // 获取评论信息
      this.rateInfo = data.rate.list ? new RateInfo(data.rate.list[0]) : {};
    });
    // 请求推荐数据
    getRecommend().then(res => {
      const list = res.data.list;
      this.recommend = list;
    });
  },
  methods: {
    goodsImageLoad() {
      this.$refs.scroll.refresh();

      // 获取各区域所处位置
      this.position.params =
        this.$refs.paramsInfo.$el.offsetTop - this.navBarHeight;
      this.position.rate =
        this.$refs.rateInfo.$el.offsetTop - this.navBarHeight;
      this.position.recommend =
        this.$refs.recommend.$el.offsetTop - this.navBarHeight;
    },
    // 滑动到不同位置，tabControl高亮跟着改变
    scroll(position) {
      /*
       * this.$refs.navBar DetailNavBar组件
       * ....$refs.tab NavBar组件里的TabControl组件
       */
      const tab = this.$refs.navBar.$refs.tab;
      if (-position.y < this.position.params) {
        // 把this.currentIndex的值给tabControl组件里的currentIndex
        tab.currentIndex = this.currentIndex = 0;
      } else if (-position.y < this.position.rate) {
        tab.currentIndex = this.currentIndex = 1;
      } else if (-position.y < this.position.recommend) {
        tab.currentIndex = this.currentIndex = 2;
      } else tab.currentIndex = this.currentIndex = 3;
    },
    // 点击tabControl到达页面指定位置
    tabClick(index) {
      // 将当前index传给currentIndex，使其可以传值给tabControl组件
      this.currentIndex = index;
      switch (index) {
        case 0:
          this.$refs.scroll.scrollTo(0, 0, 0);
          break;
        case 1:
          this.$refs.scroll.scrollTo(0, -this.position.params, 0);
          break;
        case 2:
          this.$refs.scroll.scrollTo(0, -this.position.rate, 0);
          break;
        case 3:
          this.$refs.scroll.scrollTo(0, -this.position.recommend, 0);
          break;
      }
    },
    // 上拉加载
    noMore() {
      this.isShowNoMore = true;
    },
    goodsItemImageLoad() {
      this.refresh();
    },
  },
};
</script>
<style scoped>
#detail {
  height: 100vh;
  padding-top: 44px;
}
.detail_navBar {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 1;
  background-color: #fff;
}
.wrapper {
  height: calc(100% - 49px);
  overflow: hidden;
}
.no_more {
  height: 49px;
  line-height: 49px;
  text-align: center;
}
</style>
