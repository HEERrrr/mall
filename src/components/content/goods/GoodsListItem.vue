<template>
  <div class="goods_item" @click="itemClick">
    <img :src="showImage" alt="" @load="imageLoad" />
    <div class="goods_info">
      <p>{{ goodsItem.title }}</p>
      <span class="price">{{ goodsItem.price }}</span>
      <i class="iconfont">&#xe8b9;</i>
      <span>{{ goodsItem.cfav }}</span>
    </div>
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
      if (this.$route.path.indexOf("/home") == 0) {
        this.$emit("hImageLoad");
      } else if (this.$route.path.indexOf("/detail") == 0) {
        this.$emit("dImageLoad");
      }
    },
    itemClick() {
      this.$router.push("/detail/" + this.goodsItem.iid);
    },
  },
  computed: {
    showImage() {
      /* return this.goodsItem.image
        ? this.goodsItem.image
        : this.goodsItem.show.img; */
      return (
        // 注意.show.img放在最后,因为如果.show是undefined,.show.img会报错
        this.goodsItem.image || this.goodsItem.img || this.goodsItem.show.img
      );
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
  font-size: 13px;
  margin: 0 2px 0 10px;
}
</style>
