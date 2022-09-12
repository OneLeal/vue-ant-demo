<template>
  <div class="chanel-page">
    <ul v-if="isShow">
      <li v-for="item in list" :key="item.index">
        <div class="image-box">
          <img :src="item.src" />
        </div>
      </li>
    </ul>

    <div v-else>
      <div class="percent">
        <p>预加载百分比(computed):</p>
        <span>{{ calcPercent }}</span>
      </div>

      <div class="percent">
        <p>预加载百分比(watch):</p>
        <span>{{ percent }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mockData, preLoad } from "./utils";
export default {
  data() {
    return {
      isShow: false,
      percent: "0%",
      total: 0,
      list: [],
      imageCache: [],
    };
  },
  computed: {
    calcPercent() {
      const { imageCache, total } = this;
      const num = imageCache.length;
      const result = Math.floor((num / total) * 100) + "%";
      console.log("预加载百分比: ", result);
      return total ? result : "0%";
    },
  },
  watch: {
    "imageCache.length": {
      immediate: true,
      handler: function(value) {
        this.percent = this.calc(value);
        console.log("预加载百分比: ", value, this.percent);
      },
    },
  },
  created() {
    this.fetchData();
  },
  methods: {
    // 获取图片
    async fetchData() {
      const { list, handleData } = this;
      const { data } = await mockData();
      this.total = data.list.length;
      handleData(data.list);
      // this.list = data.list; // 不使用图片预加载
    },

    // 预加载图片路径
    async loadSrc(path) {
      try {
        const { src } = await preLoad(path);
        return src;
      } catch (error) {
        console.warn(error);
      }
    },

    // 使用图片预加载
    async handleData(list = []) {
      const { loadSrc, imageCache } = this;
      for (let i = 0; i < list.length; i++) {
        const src = await loadSrc(list[i].src);
        imageCache.push({ index: i + 1, src });
      }

      this.list = imageCache;
      this.isShow = true;
    },

    // 计算预加载百分比
    calc(num) {
      const { total } = this;
      if (!total) return 0 + "%";
      return Math.floor((num / total) * 100) + "%";
    },
  },
};
</script>

<style lang="less" scoped>
@import url("./index.less");
</style>
