<template>
  <swiper class="detail_swiper">
    <swiper-item v-for="(item, index) in topImages" :key="index">
      <img :src="item" />
    </swiper-item>
  </swiper>
</template>
<script>
import { Swiper, SwiperItem } from "components/common/swiper";
export default {
  name: "DetailSwiper",
  components: {
    Swiper,
    SwiperItem,
  },
  props: {
    topImages: {
      type: Array,
    },
  },
  data() {
    return {
      isLoad: false,
    };
  },
};
</script>
<style scoped>
.detail_swiper {
  height: 300px;
  overflow: hidden;
}
</style>
