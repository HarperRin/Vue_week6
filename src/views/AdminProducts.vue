<template>
  <div class="container">
    <h2 class="text-center mt-5">後台產品列表</h2>
    <div class="text-end mt-4">
      <button class="btn btn-primary" type="button" @click="openModal('isNew')">
        建立新的產品
      </button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th width="120">分類</th>
          <th>產品名稱</th>
          <th width="120">原價</th>
          <th width="120">售價</th>
          <th width="100">是否啟用</th>
          <th width="120">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in products" :key="item.id">
          <td>{{ item.category }}</td>
          <td>{{ item.title }}</td>
          <td class="text-start">{{ item.origin_price }}</td>
          <td class="text-start">{{ item.price }}</td>
          <td>
            <span
              :class="{
                'text-success': item.is_enabled,
                'text-danger': !item.is_enabled,
              }"
            >
              {{ item.is_enabled ? "啟用" : "未啟用" }}
            </span>
          </td>
          <td>
            <div class="btn-group">
              <button
                type="button"
                class="btn btn-outline-primary btn-sm"
                @click="openModal('edit', item)"
              >
                編輯
              </button>
              <button
                type="button"
                class="btn btn-outline-danger btn-sm"
                @click="openModal('delete', item)"
              >
                刪除
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <Pagination :pages="pagination" @get-products="getProducts"></Pagination>
  </div>
  <!-- 新增/編輯Modal -->
  <AdminProductModal
    :temp="temp"
    :is-new="isNew"
    :page="pagination"
    @update-product="updateProduct"
    ref="AdminProductModal"
  >
  </AdminProductModal>
  <!-- 刪除Modal -->
  <AdminDelProductModal
    :temp="temp"
    :page="pagination"
    @del-product="delProduct"
    ref="AdminDelProductModal"
  >
  </AdminDelProductModal>
</template>

<script>
import Pagination from "@/components/PaginationView.vue";
import AdminProductModal from "@/components/AdminProductModal.vue";
import AdminDelProductModal from "@/components/AdminDelProductModal.vue";

export default {
  props: ["token"],
  data() {
    return {
      products: [],
      temp: {
        imagesUrl: [],
      },
      isNew: false,
      pagination: {},
    };
  },
  components: {
    Pagination,
    AdminProductModal,
    AdminDelProductModal,
  },
  methods: {
    getProducts(page = 1) {
      // API
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/products?page=${page}`;
      this.$http
        .get(api)
        .then((res) => {
          this.products = res.data.products;
          this.pagination = res.data.pagination;
        })
        .catch((err) => {
          alert(err.data.message);
        });
    },
    openModal(status, item) {
      if (status === "isNew") {
        this.temp = {
          // 需要做清空物件的動作
          imagesUrl: [],
        };
        // 看資料是不是新增狀態
        this.isNew = true; // 改變 status 的狀態
        this.$refs.AdminProductModal.openModal();
      } else if (status === "edit") {
        // 賦予資料
        this.temp = JSON.parse(JSON.stringify(item)); //使用深拷貝，因為item.imageUrl裡還有陣列，進行修改會有傳參考的問題
        // 看資料是不是新增狀態，因為現在是編輯，所以是false狀態
        this.isNew = false;
        // 把Modal打開，做編輯
        this.$refs.AdminProductModal.openModal();
      } else if (status === "delete") {
        // 賦予資料，因為刪除時要拿到產品名稱
        this.temp = { ...item };
        // 不需要是因為this.isNew = false;是用來判斷新增/編輯的Modal，delete的Modal是獨立的
        this.$refs.AdminDelProductModal.openModal();
      }
    },
    updateProduct(page) {
      let api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product`;
      let method = "post";
      // 根據 isNew 來判斷要串接 post 或是 put API
      // 如果this.isNew 是false狀態，就是編輯狀態
      if (!this.isNew) {
        api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${this.temp.id}`;
        method = "put";
      }
      // 因 post 和 put 需要帶的參數相同，成功後的行為也相同（整體函式架構長一樣），所以可以寫在一起
      // this.$http[method] = this.$http.method物件取值
      // 按照API格式把資料帶進來
      this.$http[method](api, { data: this.temp })
        .then((res) => {
          alert(res.data.message);
          // 把Modal收起來
          this.$refs.AdminProductModal.hideModal();
          // 再取得一次資料
          this.getProducts(page);
        })
        .catch((err) => {
          alert(err.data.message);
        });
    },
    delProduct(page) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${this.temp.id}`;
      this.$http
        .delete(api)
        .then((res) => {
          alert(res.data.message);
          this.$refs.AdminDelProductModal.hideModal();
          // 再取得一次資料
          this.getProducts(page);
        })
        .catch((err) => {
          alert(err.data.message);
        });
    },
  },
  mounted() {
    this.getProducts();
  },
};
</script>
