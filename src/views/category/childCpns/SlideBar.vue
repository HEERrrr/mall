<template>
  <div @load="test">
    <scroll class="wrapper" ref="scroll">
      <ul id="a">
        <li
          v-for="(item, index) in titles"
          :key="index"
          :class="{ active: currentIndex === index }"
          @click="barClick(index)"
        >
          {{ item.title }}
        </li>
      </ul>
    </scroll>
  </div>
</template>
<script>
import Scroll from "components/common/scroll/Scroll.vue";
export default {
  name: "SlideBar",
  components: { Scroll },
  data() {
    return {
      currentIndex: 0,
    };
  },
  props: {
    titles: Array,
  },
  methods: {
    barClick(index) {
      this.currentIndex = index;
      const maitKey = this.titles[index].maitKey;
      const miniWallkey = this.titles[index].miniWallkey;
      this.$emit("barClick", maitKey, miniWallkey);
    },
  },
};
</script>
<style scoped>
.wrapper {
  height: calc(100vh - 93px);
}
li {
  height: 45px;
  line-height: 45px;
  text-align: center;
}
.active {
  background-color: #fff;
  border-left: 3px solid #eb6f7e;
  font-weight: bold;
  color: #eb6f7e;
}
</style>
