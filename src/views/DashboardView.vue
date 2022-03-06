<template>
  <DashboardNavbar></DashboardNavbar>
  <VLoading :active="isLoading"></VLoading>
  <router-view v-if="checkSuccess"></router-view>
</template>

<script>
import DashboardNavbar from "@/components/DashboardNavbar.vue";

export default {
  components: {
    DashboardNavbar,
  },
  data() {
    return {
      checkSuccess: false,
      isLoading: false,
    };
  },
  methods: {
    checkLogin() {
      const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
        "$1"
      );
      if (token) {
        this.isLoading = true;
        this.$http.defaults.headers.common.Authorization = `${token}`;
        const api = `${process.env.VUE_APP_API}api/user/check`;
        this.$http
          .post(api)
          .then(() => {
            // 如果是登入狀態才允許轉到後台產品頁面，取得產品資料
            // 如果不是登入狀態會跳出警示，並將使用者導回登入頁面
            this.checkSuccess = true;
            this.isLoading = false;
          })
          .catch((err) => {
            alert(err.data.message);
            this.$router.push("/login");
          });
      } else {
        alert("您尚未登入。");
        this.$router.push("/login");
      }
    },
  },
  mounted() {
    this.checkLogin();
  },
};
</script>
