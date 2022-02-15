<template>
  <div id="toast">
    <transition
      :duration="{ enter: 2500, leave: 500 }"
      enter-active-class="animate__animated animate__fadeIn"
      leave-active-class="animate__animated animate__fadeOut"
    >
      <!-- 普通弹框 -->
      <div v-if="type === 'normal'" class="normal_toast">
        <span>
          <div class="icon" ref="icon" v-if="showIcon">✔</div>
          {{ toastText }}
        </span>
      </div>
      <!-- 删除弹框 -->
      <div v-else-if="type === 'del'" class="mask" @click="thinkClick">
        <div class="del_toast" @click.stop="">
          <div class="del_content">{{ delContent }}</div>
          <div class="del_bottom">
            <span style="flex: 1" @click="thinkClick">我再想想</span>
            <span class="delete" @click="delClick">删除</span>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  name: "Toast",
  data() {
    return {
      type: "",
      toastText: "",
      showIcon: false,
      timer: null,
      showDel: false,
      delContent: "",
      confirmDel: false,
    };
  },
  methods: {
    // 根据参数的值，决定normalToast位置以及是否显示✔图标
    setIcon(flag) {
      const toast = document.querySelector("#toast");
      const normalToast = toast.querySelector(".normal_toast");
      if (flag) {
        this.showIcon = true;
        normalToast.style.bottom = 45 + "vh";
      } else {
        this.showIcon = false;
        normalToast.style.bottom = 60 + "px";
      }
    },
    // 设置普通弹框内容
    setNormalText(text, flag = false) {
      this.toastText = text;
      this.type = "normal";

      // 节流，不断点击时toast一直显示，直到不再点击
      this.timer && clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.type = "";
      }, 2000);

      // 使用定时器确保type=normal执行后再执行定时器内语句，否则找不到normalToast
      setTimeout(() => {
        this.setIcon(flag);
      }, 1);
    },
    // 设置删除弹框内容
    setDelContent(text) {
      this.type = "del";
      this.delContent = text;
    },
    // 点击'我再想想'
    thinkClick() {
      this.type = "";
    },
    // 删除商品
    delClick() {
      this.confirmDel = true;
      this.type = "";
      setTimeout(() => {
        this.confirmDel = false;
      }, 100);
    },
  },
};
</script>
<style scoped>
#toast {
  position: fixed;
  z-index: 99;
  text-align: center;
}
.normal_toast {
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
.normal_toast .icon {
  height: 30px;
  line-height: 30px;
  font-size: 25px;
  color: #fa3707;
}
.mask {
  position: absolute;
  bottom: -49px;
  width: 100vw;
  height: 100vh;
  background-color: rgba(100, 100, 100, 0.3);
}
.del_toast {
  position: fixed;
  left: calc((100vw - 60%) / 2);
  width: 60%;
  top: 45vh;
  border-radius: 10px;
  background-color: #fff;
  font-size: 14px;
}
.del_content {
  padding: 20px 30px;
  border-radius: 10px 10px 0 0;
  border-bottom: 1px solid rgba(100, 100, 100, 0.1);
}
.del_bottom {
  display: flex;
  height: 40px;
  line-height: 40px;
}
.del_bottom .delete {
  flex: 1;
  border-left: 1px solid rgba(100, 100, 100, 0.1);
  color: #ff5777;
}
</style>
