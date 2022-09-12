<template>
  <div>
    <van-button type="primary" @click="isShow = true">主要按钮</van-button>

    <van-cell title="单元格" is-link />
    <van-cell title="单元格" is-link value="内容" />
    <van-cell title="单元格" is-link arrow-direction="down" value="内容" />

    <van-popup
      v-model="isShow"
      round
      position="bottom"
      :style="{ height: '70%' }"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShow: false,
    };
  },
  computed: {},
  mounted() {},
};
</script>

<style></style>
