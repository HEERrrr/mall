<template>
  <div class="choose" :class="{ checked_active: chooseClass }"></div>
</template>
<script>
export default {
  name: "CartChoose",
  props: {
    index: {
      type: Number,
    },
    chooseClass: {
      type: Boolean,
    },
  },
};
</script>
<style scoped>
.choose {
  width: 20px;
  max-width: 20px;
  height: 20px;
  margin-right: 10px;
  border-radius: 50%;
  border: 2px solid rgba(248, 101, 3, 0.2);
}
.checked_active {
  position: relative;
  background-color: #f16220;
}
.checked_active::before {
  position: absolute;
  left: 3px;
  top: 4px;
  transform: rotate(-50deg);
  width: 8px;
  height: 4px;
  border: 2px solid #fff;
  border-top: none;
  border-right: none;
  content: "";
}
</style>
