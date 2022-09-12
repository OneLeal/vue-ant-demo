// 图片预加载方法
export const preLoad = (src) => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = src;
    image.onload = () => resolve(image);
    image.onerror = () => reject({ message: "图片加载失败" });
  });
};

// mock 数据
export const mockData = () => ({
  code: 200,
  state: "success",
  data: {
    list: [
      {
        index: 1,
        src: "http://pic1.win4000.com/pic/8/27/58a91121433.jpg",
      },

      {
        index: 2,
        src: "http://pic1.win4000.com/pic/8/27/58a91121439.jpg",
      },

      {
        index: 3,
        src: "http://pic1.win4000.com/pic/8/27/58a91121447.jpg",
      },

      {
        index: 4,
        src: "http://pic1.win4000.com/pic/8/27/58a91121435.jpg",
      },

      {
        index: 5,
        src: "http://pic1.win4000.com/pic/6/10/b70c558326.jpg",
      },

      {
        index: 6,
        src: "http://pic1.win4000.com/pic/6/10/b70c558327.jpg",
      },

      {
        index: 7,
        src: "http://pic1.win4000.com/pic/6/10/b70c558329.jpg",
      },

      {
        index: 8,
        src: "http://pic1.win4000.com/pic/6/10/b70c558328.jpg",
      },

      {
        index: 9,
        src: "http://pic1.win4000.com/pic/c/60/f4df557356.jpg",
      },

      {
        index: 10,
        src: "http://pic1.win4000.com/pic/c/60/f4df557360.jpg",
      },

      {
        index: 11,
        src:
          "https://img.mp.itc.cn/q_70,c_zoom,w_640/upload/20170502/9563234750534eff8600431aa66724fc_th.jpg",
      },

      {
        index: 12,
        src: "http://pic1.win4000.com/pic/c/b1/cb46556733.jpg",
      },

      {
        index: 13,
        src:
          "http://n.sinaimg.cn/translate/w584h840/20180120/pObP-fyqtwzv0968197.jpg",
      },

      {
        index: 14,
        src:
          "http://n.sinaimg.cn/translate/w584h876/20180120/_PoK-fyqtwzv0968566.jpg",
      },
    ],
  },
});
