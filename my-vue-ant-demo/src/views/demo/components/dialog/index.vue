<template>
  <div class="dialog-page">
    <button @click="show = !show">
      Toggle render
    </button>

    <transition name="slide-fade">
      <p v-if="show" class="dialog-box">
        <a-button @click="info">Info</a-button>
      </p>
    </transition>

    <Dialog />
  </div>
</template>

<script>
import Dialog from "./components/dialog.vue";
export default {
  components: { Dialog },
  data() {
    return { show: false };
  },
  methods: {
    info() {
      this.$info({ content: "xxx" });
    },
  },
};
</script>

<style lang="less" scoped>
@import url("./index.less");
/* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */
</style>
