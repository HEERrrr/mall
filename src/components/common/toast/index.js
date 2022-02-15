import Toast from "./Toast.vue";
import { createApp } from "vue";

const toast = {};
toast.install = function (app) {
  const toast = createApp(Toast);
  const node = document.createElement("div");
  document.body.appendChild(node);
  // 将组件对象挂载到创建的div上
  const instance = toast.mount(node);

  app.config.globalProperties.$toast = instance;
};

export default toast;
