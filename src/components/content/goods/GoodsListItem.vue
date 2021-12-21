<template>
  <div class="goods_item" @click="itemClick">
    <!-- <a :href="goodsItem.link"> -->
    <img
      :src="goodsItem.show.img"
      alt=""
      @load="imageLoad"
      @imageLoad="imageLoad"
    />
    <div class="goods_info">
      <p>{{ goodsItem.title }}</p>
      <span class="price">{{ goodsItem.price }}</span>
      <i class="iconfont">&#xe601;</i>
      <span>{{ goodsItem.cfav }}</span>
    </div>
    <!-- </a> -->
    <div class="info"></div>
  </div>
</template>
<script>
export default {
  name: "GoodsListItem",
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    // 监听图片加载完成
    imageLoad() {
      // 发送自定义事件让Home.vue接收
      this.$emit("imageLoad");
      /**
       *拿到store中Home.vue传过去的scroll
       *this.$store.state.scroll.refresh();
       */
    },
    itemClick() {
      this.$router.push("/detail/" + this.goodsItem.iid);
    },
  },
};
</script>
<style scoped>
.goods_item {
  width: 48%;
  font-size: 12px;
}
.goods_item img {
  width: 100%;
  border-radius: 5px;
  margin-bottom: 10px;
}
.goods_info {
  text-align: center;
  margin-bottom: 5px;
}
.goods_info p {
  margin-bottom: 3px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.goods_info .price {
  color: #ff5777;
}
.goods_item .iconfont {
  font-size: 12px;
  margin: 0 2px 0 10px;
}
</style>
