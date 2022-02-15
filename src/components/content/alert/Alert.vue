<template>
  <div
    class="alert animate__animated"
    :class="alertClass"
    v-show="judgeClass.in"
  >
    <div v-if="!showDel" class="normal_alert" ref="normalAlert">
      <span>
        <div class="icon" ref="icon" v-if="showIcon">✔</div>
        {{ alertText }}
      </span>
    </div>
    <div v-else class="del_alert">
      <slot name="extra"></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: "Alert",
  data() {
    return {
      judgeClass: {
        in: false,
        out: false,
        timer1: null,
        timer2: null,
      },
      alertText: "",
      showIcon: false,
      showDel: false,
    };
  },
  computed: {
    alertClass() {
      return {
        animate__fadeIn: this.judgeClass.in,
        animate__fadeOut: this.judgeClass.out,
      };
    },
  },
};
</script>
<style scoped>
.alert {
  position: fixed;
  z-index: 3;
  text-align: center;
}
.normal_alert {
  position: fixed;
  left: calc((100vw - 55%) / 2);
  bottom: 60px;
  width: 55%;
  padding: 5px 0;
  background-color: rgb(24, 23, 23);
  border-radius: 10px;
  opacity: 0.8;
  color: #fff;
}
.normal_alert .icon {
  height: 30px;
  line-height: 30px;
  font-size: 25px;
  color: #fa3707;
}
.del_alert {
  position: fixed;
  left: calc((100vw - 60%) / 2);
  width: 60%;
  top: 45vh;
  border-radius: 10px;
  background-color: #fff;
  font-size: 14px;
}
/* .del_alert .confirm {
  padding: 20px 30px;
  border-radius: 10px 10px 0 0;
  border-bottom: 1px solid rgba(100, 100, 100, 0.1);
}
.del_alert .del_bottom {
  display: flex;
  height: 40px;
  line-height: 40px;
}
.del_bottom .del_text {
  flex: 1;
  border-left: 1px solid rgba(100, 100, 100, 0.1);
  color: #ff5777;
} */
</style>
