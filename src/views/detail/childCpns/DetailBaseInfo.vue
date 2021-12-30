<template>
  <div class="base_info" v-if="Object.keys(baseInfo).length !== 0">
    <p class="info_title">{{ baseInfo.title }}</p>
    <div class="info_price">
      <span class="price">{{ baseInfo.price }}</span>
      <s class="old_price">{{ baseInfo.oldPrice }}</s>
      <span
        class="discount"
        :style="{ backgroundColor: baseInfo.discountBgColor }"
        v-if="baseInfo.discountDesc"
        >{{ baseInfo.discountDesc }}</span
      >
    </div>
    <div class="info_other">
      <span>{{ baseInfo.columns[0] }}</span>
      <span>{{ baseInfo.columns[1] }}</span>
      <span>{{ baseInfo.services[baseInfo.services.length - 1].name }}</span>
    </div>
    <div class="info_services">
      <template v-for="(item, index) in baseInfo.services">
        <!--
          1.请求到的services数据中icon不存在，则此条数据不显示 
          2.最后一条数据不显示
        -->
        <div
          v-if="item.icon && index !== baseInfo.services.length - 1"
          class="services_item"
          :key="index"
        >
          <img :src="item.icon" alt="" />
          <span>{{ item.name }}</span>
        </div>
      </template>
    </div>
  </div>
</template>
<script>
export default {
  name: "DetailBaseInfo",
  props: {
    baseInfo: {
      type: Object,
    },
  },
};
</script>
<style scoped>
.base_info {
  padding: 15px 5px 20px;
  border-bottom: 5px solid #f2f5f8;
  color: #999;
}
.info_title {
  padding-bottom: 10px;
  color: #222;
}
.info_price {
  position: relative;
}
.price {
  color: #ff5777;
  font-size: 24px;
}
.old_price {
  margin-left: 5px;
  font-size: 13px;
}
.discount {
  position: absolute;
  top: 0;
  margin-left: 5px;
  padding: 2px 5px;
  border-radius: 8px;
  color: #fff;
  font-size: 12px;
}
.info_other {
  display: flex;
  margin-top: 25px;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(100, 100, 100, 0.1);
  justify-content: space-between;
  font-size: 13px;
}
.info_services {
  display: flex;
  justify-content: space-between;
  padding-top: 20px;
}
.services_item img,
.a {
  width: 14px;
  height: 14px;
}
.services_item span,
.b {
  color: #333;
  font-size: 13px;
}
</style>
