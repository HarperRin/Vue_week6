<template>
  <h2>單一產品</h2>
  <VLoading :active="isLoading"></VLoading>
  <div class="container">
    <div class="row">
      <div class="col">
        <h3>產品名稱: {{ product.title }}</h3>
        <img :src="product.imageUrl" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      product: {},
      isLoading: false,
    };
  },
  methods: {
    getProduct() {
      const { id } = this.$route.params;
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/product/${id}`;
      this.$http(api)
        .then((res) => {
          this.isLoading = true;
          this.product = res.data.product;
        })
        .catch((err) => {
          alert(err.data.message);
        });
    },
  },
  mounted() {
    this.getProduct();
  },
};
</script>
