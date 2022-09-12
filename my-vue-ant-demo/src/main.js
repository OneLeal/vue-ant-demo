import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Antd from "ant-design-vue";
import Vant from "vant";

import axios from "axios";
import "ant-design-vue/dist/antd.less";
import "vant/lib/index.css";

Vue.config.productionTip = false;
Vue.use(Antd);
Vue.use(Vant);

Vue.prototype.$axios = axios;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
