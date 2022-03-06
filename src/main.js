import { createApp } from "vue";

import "@popperjs/core";
import "bootstrap";

import axios from "axios";
import VueAxios from "vue-axios";

import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

import { Form, Field, ErrorMessage, defineRule, configure } from "vee-validate"; //解構形式，把函式從VeeValidate取出使用
import { required, email, min, max } from "@vee-validate/rules"; //加入特定規則
import { localize, setLocale } from "@vee-validate/i18n";
import zhTW from "@vee-validate/i18n/dist/locale/zh_TW.json"; //不用再把資源存在本地端，可以直接在npm裡面使用

import App from "./App.vue";
import router from "./router";

// 定義驗證規則
defineRule("required", required);
defineRule("email", email);
defineRule("min", min);
defineRule("max", max);
// 設定 vee-validate 全域規則
configure({
  generateMessage: localize({ zh_TW: zhTW }), // 載入繁體中文語系
  validateOnInput: true, // 當輸入任何內容直接進行驗證
});
// 因為設定檔可能沒辦法直接啟用，所以強制設定預設語系是中文
setLocale("zh_TW");

const app = createApp(App);
app.use(router);
app.use(VueAxios, axios);
app.component("VLoading", Loading);
// 註冊 vee-validate 三個全域元件
app.component("VForm", Form);
app.component("VField", Field);
app.component("ErrorMessage", ErrorMessage);
app.mount("#app");
