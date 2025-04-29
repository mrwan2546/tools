import { createApp } from "vue";
import "./style.css";
import routes from "./router";
import App from "./App.vue";

createApp(App).use(routes).mount("#app");
