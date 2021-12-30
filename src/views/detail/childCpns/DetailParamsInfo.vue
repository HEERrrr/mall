<template>
  <div id="params_info" v-if="Object.keys(paramsInfo).length !== 0">
    <table class="size">
      <tr>
        <th :colspan="paramsInfo.rule.tables[0].length">
          {{ paramsInfo.rule.key }}
        </th>
      </tr>
      <tr v-for="(item, index) in paramsInfo.rule.tables[0]" :key="index">
        <td v-for="(value, key) in item" :key="key">
          {{ value }}
        </td>
      </tr>
      <tr v-if="paramsInfo.disclaimer">
        <td :colspan="paramsInfo.rule.tables[0].length" class="disc">
          {{ paramsInfo.disclaimer }}
        </td>
      </tr>
    </table>
    <table class="params">
      <tr>
        <th colspan="2">
          {{ paramsInfo.info.key }}
        </th>
      </tr>
      <tr v-for="(item, index) in paramsInfo.info.set" :key="index">
        <td class="params_key">{{ item.key }}</td>
        <td class="params_value">{{ item.value }}</td>
      </tr>
    </table>
    <img
      :src="paramsInfo.info.images[0]"
      class="about"
      v-if="paramsInfo.info.images"
    />
  </div>
</template>
<script>
export default {
  name: "DetailParamsInfo",
  props: {
    paramsInfo: {
      type: Object,
    },
  },
};
</script>
<style scoped>
#params_info {
  font-size: 14px;
  color: #666;
}
.size,
.params {
  width: 100%;
  padding: 0 15px 15px;
  border-spacing: 0;
  border-bottom: 5px solid #f2f5f8;
}
th {
  padding: 15px 0 15px;
  border-bottom: 2px solid #f2f5f8;
  text-align: left;
  font-weight: normal;
  font-size: 15px;
  color: #333;
}
td {
  height: 50px;
  border-bottom: 1px solid rgba(100, 100, 100, 0.1);
}
.size .disc {
  height: 40px;
  padding-top: 15px;
  border-bottom: none;
}
.params_key {
  width: 33%;
}
.params_value {
  color: #eb4868;
}
.about {
  width: 100%;
}
</style>
