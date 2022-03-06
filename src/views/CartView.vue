<template>
  <h2 class="text-center mt-5">前台購物車</h2>
  <VLoading :active="isLoading"></VLoading>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="text-end">
        <button
          class="btn btn-outline-danger"
          type="button"
          @click="deleteCartAll"
          :disabled="cartData.carts.length === 0"
        >
          清空購物車
        </button>
      </div>
      <table class="table align-middle mt-3">
        <thead>
          <tr>
            <th></th>
            <th>品名</th>
            <th style="width: 150px">數量/單位</th>
            <th class="text-end">單價</th>
          </tr>
        </thead>
        <tbody>
          <template v-if="cartData.carts">
            <tr v-for="item in cartData.carts" :key="item.id">
              <td>
                <button
                  type="button"
                  class="btn btn-outline-danger btn-sm"
                  @click="removeCartItem(item.id)"
                  :disabled="isLoadingItem === item.id"
                >
                  <i
                    class="fas fa-spinner fa-pulse"
                    v-if="isLoadingItem === item.id"
                  ></i>
                  移除購物車
                </button>
              </td>
              <td>
                {{ item.product.title }}
              </td>
              <td>
                <div class="input-group input-group-sm">
                  <div class="input-group mb-3">
                    <select
                      id=""
                      class="form-select"
                      v-model="item.qty"
                      @change="updateCartItem(item)"
                      :disabled="isLoadingItem === product.id"
                    >
                      <option
                        :value="num"
                        v-for="num in 20"
                        :key="`${num}+${item.id}`"
                      >
                        {{ num }}
                      </option>
                    </select>
                    <span class="input-group-text" id="basic-addon2">{{
                      item.product.unit
                    }}</span>
                  </div>
                </div>
              </td>
              <td class="text-end">
                <!-- <small v-if="cart.final_total !== cart.total" class="text-success">折扣價：</small> -->
                {{ item.total }}
              </td>
            </tr>
          </template>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="3" class="text-end">總計</td>
            <td class="text-end">{{ cartData.total }}</td>
          </tr>
        </tfoot>
      </table>
    </div>
    <div class="my-4 row justify-content-center">
      <h3 class="text-center mt-5">收件人資訊</h3>
      <VForm
        ref="form"
        class="col-md-6"
        v-slot="{ errors }"
        @submit="createOrder"
      >
        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <VField
            id="email"
            name="email"
            type="email"
            class="form-control"
            :class="{ 'is-invalid': errors['email'] }"
            placeholder="請輸入 Email"
            rules="email|required"
            v-model="form.user.email"
          ></VField>
          <ErrorMessage name="email" class="invalid-feedback"></ErrorMessage>
        </div>
        <div class="mb-3">
          <label for="name" class="form-label">收件人姓名</label>
          <VField
            id="name"
            name="姓名"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': errors['姓名'] }"
            placeholder="請輸入姓名"
            rules="required"
            v-model="form.user.name"
          ></VField>
          <ErrorMessage name="姓名" class="invalid-feedback"></ErrorMessage>
        </div>
        <div class="mb-3">
          <label for="tel" class="form-label">收件人電話</label>
          <VField
            id="tel"
            name="電話"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': errors['電話'] }"
            placeholder="請輸入電話"
            :rules="isPhone"
            v-model="form.user.tel"
            required
          ></VField>
          <ErrorMessage name="電話" class="invalid-feedback"></ErrorMessage>
        </div>
        <div class="mb-3">
          <label for="address" class="form-label">收件人地址</label>
          <VField
            id="address"
            name="地址"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': errors['地址'] }"
            placeholder="請輸入地址"
            rules="required"
            v-model="form.user.address"
          ></VField>
          <ErrorMessage name="地址" class="invalid-feedback"></ErrorMessage>
        </div>
        <div class="mb-3">
          <label for="message" class="form-label">留言</label>
          <textarea
            name=""
            id="message"
            class="form-control"
            cols="30"
            rows="10"
            v-model="form.message"
          ></textarea>
        </div>
        <div class="text-end">
          <button
            type="submit"
            class="btn btn-danger"
            :disabled="!cartData.carts.length || Object.keys(errors).length > 0"
            @submit.prevent="createOrder"
          >
            送出訂單
          </button>
        </div>
      </VForm>
    </div>
  </div>
</template>

<script>
import emitter from "@/libs/emitter.js";
export default {
  data() {
    return {
      isLoading: false,
      cartData: {
        carts: [],
      },
      product: {},
      isLoadingItem: "",
      form: {
        user: {
          name: "",
          email: "",
          tel: "",
          address: "",
        },
        message: "",
      },
    };
  },
  methods: {
    getCart() {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      this.$http(api)
        .then((res) => {
          this.cartData = res.data.data;
          this.isLoading = false;
        })
        .catch((err) => {
          alert(err.data.message);
        });
    },
    removeCartItem(id) {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${id}`;
      this.$http
        .delete(api)
        .then((res) => {
          alert(res.data.message);
          this.isLoading = false;
          emitter.emit("cart-length");
          this.getCart();
        })
        .catch((err) => {
          alert(err.data.message);
        });
    },
    deleteCartAll() {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/carts`;
      this.$http
        .delete(api)
        .then((res) => {
          alert(res.data.message);
          this.isLoading = false;
          emitter.emit("cart-length");
          this.getCart();
        })
        .catch((err) => {
          alert(err.data.message);
        });
    },
    updateCartItem(item) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${item.id}`;
      const cartData = {
        product_id: item.id,
        qty: item.qty,
      };
      this.isLoadingItem = item.id;
      this.$http
        .put(api, { data: cartData })
        .then((res) => {
          alert(res.data.message);
          // emitter.emit("get-cart");
          this.isLoadingItem = "";
          emitter.emit("cart-length");
          this.getCart();
        })
        .catch((err) => {
          console.log(err.data.message);
          alert(err.data.message);
          this.isLoadingItem = "";
        });
    },
    createOrder() {
      this.isLoading = true;
      const order = this.form;
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/order`;
      this.$http
        .post(api, { data: order })
        .then((res) => {
          alert(res.data.message);
          this.$refs.form.resetForm();
          this.isLoading = false;
          this.getCart();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    isPhone(value) {
      const phoneNumber = /^(09)[0-9]{8}$/;
      return phoneNumber.test(value) ? true : "電話 須為正確的電話號碼";
    },
  },
  mounted() {
    this.getCart();
  },
};
</script>
