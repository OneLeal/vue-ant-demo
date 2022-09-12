<template>
  <a-row>
    <a-card class="goodsCard clearFix scale">
      <div class="img-wrap">
        <img slot="cover" :alt="goodsCard.details" :src="goodsCard.img" />
      </div>
      <ul class="info-wrap">
        <li class="title omit">
          <a-tooltip
            overlayClassName="card-tooltip"
            placement="topLeft"
            :title="goodsCard.label"
          >
            <span>{{ goodsCard.label }}</span>
          </a-tooltip>
        </li>
        <li>
          <span class="price">{{ RMB }}</span>
        </li>
        <li><a-rate :default-value="goodsCard.star" allow-half disabled /></li>
        <li>
          <span class="sale">{{ goodsCard.sale }}</span>
        </li>
      </ul>
      <div class="icon-collect" @click="collect">
        <a-icon :style="iconStyle" :theme="collectStyle" type="heart" />
      </div>
    </a-card>

    <a-row class="mt-20">
      <a-button type="primary" @click="createData">新建数据</a-button>

      <Modal
        okText="提 交"
        cancelText="再想想"
        :loading="loading"
        :formData="formData"
        :formItems="formItems"
        v-model="modalShow"
        @change="modalShow = !modalShow"
      />

      <!-- <template v-if="modalShow">
        <Modal
          okText="提 交"
          cancelText="再想想"
          :loading="loading"
          :formData="formData"
          :formItems="formItems"
          v-model="modalShow"
          @change="modalShow = !modalShow"
        />
      </template> -->
    </a-row>
  </a-row>
</template>

<script>
const ICON_STYLE = { fontSize: "28px", color: "#ff2c39" };
import accounting from "accounting";
import Modal from "@components/modal";
import {
  setIcon,
  setDisabled,
  iconGroup,
} from "@components/modal/utils/formConfig";
export default {
  name: "goodsCard",
  components: { Modal },
  props: {
    goodsCard: {
      type: Object,
      required: true,
      default: () => ({}),
    },
  },
  data() {
    return {
      iconStyle: ICON_STYLE,
      isCollect: false,

      // modal data
      modalShow: false,
      loading: false,
      formData: [],
      formItems: {},
    };
  },
  computed: {
    collectStyle() {
      return this.isCollect ? "filled" : "twoTone";
    },

    RMB: {
      get() {
        return accounting.formatMoney(this.goodsCard.price, "￥", 2, ",");
      },
    },
  },
  methods: {
    collect() {
      this.isCollect = !this.isCollect;
    },

    createData() {
      this.fetchModalData();
      this.modalShow = true;
    },

    fetchModalData() {
      this.loading = true;
      let timer = setTimeout(() => {
        this.$axios
          .get("/modal/goodsCard")
          .then((res) => {
            const { data, code } = res.data;
            if (code === 200) {
              // 排序，设置 ico、disabled、required、单选框的默认值等，都在这里进行，封装一个公共方法
              data.formItems = setIcon(data.formItems, iconGroup());

              data.formItems.forEach((item) => {
                if (item.label === "兴趣标签") {
                  item.option = setDisabled(item.option, ["抖音", "知乎"]);
                }
              });

              this.formData = data.formItems.sort((a, b) => a.index - b.index);
              console.log(this.formData);
              // this.formData = []; // 测试空数组
              for (let key of data.formItems) {
                this.$set(this.formItems, key.label, undefined); // 一定要这么写
                // this.formItems[key.label] = undefined;
              }
              console.log(this.formData, this.formItems);
            } else {
              throw new Error("request failed !");
            }
          })
          .catch((err) => {
            this.$message.warn({
              title: "提 示",
              content: "新建数据接口调用失败！",
            });
            console.warn(err);
          })
          .finally(() => {
            this.loading = false;
          });
      }, 1500);
      timer = null;
    },
  },
  created() {
    this.fetchModalData();
  },
};
</script>

<style lang="less" scoped>
.goodsCard {
  width: 448px;

  /deep/ .ant-card {
    position: relative;
  }

  .img-wrap {
    float: left;
  }

  .info-wrap {
    padding-top: 5px;
    padding-left: 20px;
    width: 200px;
    float: left;
    list-style: none;

    li {
      padding: 5px 0;
    }
  }

  img {
    width: 180px;
  }

  .icon-collect {
    margin-right: 6px;
    font-size: 24px;
    position: absolute;
    right: 24px;
    bottom: 24px;
    cursor: pointer;
  }

  .sale:before {
    content: "已售：";
    font-size: @font-default;
    color: @color-black;
  }

  .sale {
    color: @color-red;
    font-size: @font-big;
    font-weight: bolder;
  }

  .title {
    color: @color-black;
    font-size: @font-big;
    font-weight: bolder;
  }

  .card-tooltip {
    background-color: @color-gray;
    color: @color-black;
  }

  .price:before {
    content: "价格：";
    font-size: @font-big;
    color: @color-black;
    font-weight: bolder;
  }
}
</style>
