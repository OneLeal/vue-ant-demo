<template>
  <div v-if="visible" class="dialog-wrap">

  </div>
</template>

<script>
import { defType } from "@utils";
export default {
  props: {
    visible: defType(true),
  },
  model: {
    prop: "visible",
    event: "change",
  },
  data() {
    return {};
  }
};
</script>

<style lang="less" scoped>
.dialog-wrap {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 99;
  background: rgba(0, 0, 0, 0.5);
}
</style>
