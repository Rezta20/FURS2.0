import { createApp } from "vue";
import App from "./App.vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import { createPinia } from "pinia";
import router from "./router"; // 引入路由
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import "./assets/styles/global.css";

const app = createApp(App);
app.use(ElementPlus);
app.use(createPinia());
app.use(router);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.mount("#app");
