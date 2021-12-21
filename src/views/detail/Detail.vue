<template>
  <div>详情页</div>
</template>
<script>
import { getDetail } from "network/detail.js";
export default {
  name: "Detail",
  data() {
    return {
      iid: null,
      // data:null
    };
  },
  created() {
    this.iid = this.$route.params.iid;
    this.getDetail(this.iid);
  },
  methods: {
    // 网络请求
    getDetail(iid) {
      getDetail(iid).then(res => {
        console.log(res);
      });
    },
  },
};
</script>
<style scoped></style>
