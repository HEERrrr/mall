<template>
  <div class="recommend">
    <div class="recommend_item" v-for="item in recommend" :key="item">
      <a :href="item.link">
        <img :src="item.image" alt="" />
        <div>{{ item.title }}</div>
      </a>
    </div>
  </div>
</template>
<script>
export default {
  name: "RecommendView",
  props: {
    recommend: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>
<style scoped>
.recommend {
  display: flex;
  width: 100%;
  padding: 10px 0 20px;
  border-bottom: 10px solid #eee;
  text-align: center;
  font-size: 12px;
}
.recommend_item {
  flex: 1;
}
.recommend_item img {
  width: 70px;
  height: 70px;
  margin-bottom: 10px;
}
</style>
