<template>
  <div class="container mt-5 mb-5">
    <h2 class="text-center">產品列表頁面</h2>
    <VLoading :active="isLoading"></VLoading>
    <table class="table align-middle mt-5">
      <thead>
        <tr>
          <th>圖片</th>
          <th>商品名稱</th>
          <th>價格</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id">
          <td style="width: 200px">
            <div
              style="
                height: 100px;
                background-size: cover;
                background-position: center;
              "
              :style="{ backgroundImage: `url(${product.imageUrl})` }"
            ></div>
          </td>
          <td>
            {{ product.title }}
          </td>
          <td>
            <div class="h5" v-if="!product.price">
              {{ product.origin_price }} 元
            </div>
            <del class="h6" v-if="product.price"
              >原價 {{ product.origin_price }} 元</del
            >
            <div class="h5" v-if="product.price">
              現在只要 {{ product.price }} 元
            </div>
          </td>
          <td>
            <div class="btn-group btn-group-sm">
              <button
                type="button"
                class="btn btn-outline-secondary"
                @click="getProduct(product.id)"
                :disabled="isLoadingItem === product.id || !product.is_enabled"
              >
                <i
                  class="fas fa-spinner fa-pulse"
                  v-show="isLoadingItem === product.id"
                ></i>
                查看更多
              </button>
              <button
                type="button"
                class="btn btn-outline-danger"
                @click="addToCart(product.id)"
                :disabled="isLoadingItem === product.id || !product.is_enabled"
              >
                <i
                  class="fas fa-spinner fa-pulse"
                  v-show="isLoadingItem === product.id"
                ></i>
                加到購物車
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <UserProductModal
      ref="userProductModal"
      :product="product"
      @add-to-cart="addToCart"
    ></UserProductModal>
  </div>
</template>

<script>
import emitter from "@/libs/emitter.js";
import UserProductModal from "@/components/UserProductModal.vue";

export default {
  name: "ProductsView",
  data() {
    return {
      products: [],
      isLoadingItem: "",
      isLoading: false,
      product: {},
    };
  },
  components: {
    UserProductModal,
  },
  mounted() {
    this.getProducts();
  },
  methods: {
    addToCart(id, qty = 1) {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      const cartData = {
        product_id: id,
        qty,
      };
      this.isLoadingItem = id;
      this.$refs.userProductModal.hideModal();
      this.$http
        .post(api, { data: cartData })
        .then((res) => {
          alert(res.data.message);
          this.isLoadingItem = "";
          this.isLoading = false;
          emitter.emit("cart-length");
        })
        .catch((err) => {
          alert(err.data.message);
        });
    },
    getProducts() {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products`;
      this.$http
        .get(api)
        .then((res) => {
          this.products = res.data.products;
          this.isLoading = false;
        })
        .catch((err) => {
          alert(err.data.message);
        });
    },
    getProduct(id) {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/product/${id}`;
      this.isLoadingItem = id;
      this.$http
        .get(api)
        .then((res) => {
          this.isLoadingItem = "";
          this.product = res.data.product;
          this.isLoading = false;
          this.$refs.userProductModal.openModal();
        })
        .catch((err) => {
          alert(err.data.message);
        });
    },
  },
};
</script>
