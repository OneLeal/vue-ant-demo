<template>
  <div>购物车</div>
</template>

<script>
export default {
  name: "cart",
  mounted() {
    console.log("A");
    this.$nextTick(() => {
      console.log("B");
    });

    setTimeout(() => {
      console.log("C");
    }, 0);

    new Promise((resolve, rejected) => {
      console.log("F");
      resolve();
      console.log("D");
    }).then(() => {
      console.log("E");
    });

    this.$nextTick(() => {
      console.log("G");
    });

    this.$nextTick(() => {
      console.log("H");
    });
  },
};
</script>

<style scoped></style>
