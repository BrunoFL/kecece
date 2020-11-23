import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import DKToast from "vue-dk-toast";
import './assets/styles/index.css';

createApp(App)
  .use(store)
  .use(router)
  .use(DKToast, {
    duration: 5000,
    positionY: "bottom",
    positionX: "right",
    styles: {
      color: "#000",
      backgroundColor: "#fff"
    }
  })
  .mount("#app");
