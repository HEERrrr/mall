<template>
  <div class="tab_control">
    <div
      v-for="(item, index) in titles"
      :key="index"
      class="tab_control_item"
      @click="getIndex(index)"
    >
      <span
        :class="{ active: this.currentIndex === index }"
        :style="{ borderColor: borderColor }"
        >{{ item }}
      </span>
    </div>
  </div>
</template>
<script>
export default {
  name: "TabControl",
  props: {
    titles: {
      type: Array,
      default() {
        return [];
      },
    },
    borderColor: {
      type: String,
      default: "#ff5777",
    },
  },
  data() {
    return {
      currentIndex: 0,
    };
  },
  methods: {
    getIndex(index) {
      this.currentIndex = index;
      this.$emit("tabClick", index);
    },
  },
};
</script>
<style scoped>
.tab_control {
  display: flex;
  width: 100%;
  height: 40px;
  line-height: 40px;
  text-align: center;
  font-size: 15px;
}
.tab_control_item {
  flex: 1;
}
.tab_control_item span {
  padding: 5px;
}
.active {
  color: #ff5777;
  border-bottom: 3px solid;
}
</style>
