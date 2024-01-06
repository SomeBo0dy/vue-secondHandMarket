<script setup>
defineProps({
  goods: {
    type: Object,
    default: () => {},
  },
});
</script>
<template>
  <RouterLink :to="`/detail/${goods.gId}`" class="goods-item">
    <img v-img-lazy="goods.thumbnail" :key="goods.gId" />
    <p class="name ellipsis">{{ goods.name }}</p>
    <p class="title ellipsis">{{ goods.title }}</p>
    <p class="price">&yen;{{ goods.prize }}</p>
  </RouterLink>
</template>

<style lang="scss" scoped>
.goods-item {
  display: block;
  width: 220px;
  padding: 20px 30px;
  text-align: center;
  transition: all 0.5s;

  &:hover {
    transform: translate3d(0, -3px, 0);
    box-shadow: 0 3px 8px rgb(0 0 0 / 20%);
  }

  img {
    width: 160px;
    height: 160px;
  }

  p {
    padding-top: 10px;
  }

  .name {
    font-size: 16px;
  }

  .title {
    color: #999;
    height: 29px;
  }

  .price {
    color: $priceColor;
    font-size: 20px;
  }
}
</style>
