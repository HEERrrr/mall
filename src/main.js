import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import toast from "components/common/toast";

createApp(App).use(router).use(store).use(toast).mount("#app");
