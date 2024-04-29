import { createApp } from "vue";
import "./style.css";
import routes from "./routes";
import App from "./App.vue";

createApp(App).use(routes).mount("#app");
