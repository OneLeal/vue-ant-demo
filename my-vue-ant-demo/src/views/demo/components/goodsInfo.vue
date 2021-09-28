<template>
    <a-row class="goodsInfo">
        <a-col :span="12">
            <a-card>
                <img class="img" slot="cover" alt="example" src="/goodsInfo/goodsInfo.jpg" />
                <a-card-meta :title="goods.details">
                    <template slot="description">
                        <a-rate :default-value="goods.star" allow-half disabled />

                        <div class="icon-collect" @click="collect">
                            <a-icon :style="iconStyle" :theme="collectStyle" type="heart" />
                        </div>
                    </template>
                </a-card-meta>
            </a-card>
        </a-col>

        <a-col :span="12">
            <a-form-model :model="goods">
                <a-form-model-item label="价格" :wrapperCol="colSpan(4)" :labelCol="colSpan(4)">
                    <span class="price">{{ RMB }}</span>
                </a-form-model-item>

                <a-form-model-item :wrapperCol="colSpan(20)" :labelCol="colSpan(4)" :label="ptCodeOrUnit(goods.specification.specialCode, 1)">
                    <a-radio-group button-style="solid" v-model="capacity" @change="capacityChange">
                        <a-radio-button v-for="item in goods.specification.arr" :value="item.content" :key="item.content">
                            {{ item.content + ' ' + ptCodeOrUnit(goods.specification.specialCode) }}
                        </a-radio-button>
                    </a-radio-group>
                </a-form-model-item>

                <a-form-model-item label="库存：" :wrapperCol="colSpan(4)" :labelCol="colSpan(4)">
                    <span>{{ storage }}</span>
                </a-form-model-item>

                <a-form-model-item label="数量" :wrapperCol="colSpan(4)" :labelCol="colSpan(4)">
                    <a-input-number :min="1" :max="maxValue" v-model="number" @change="numberChange" />
                </a-form-model-item>
            </a-form-model>

            <a-row class="operation">
                <a-button type="primary">加入购物车</a-button>
                <a-button disabled class="ml-20">结 算</a-button>
            </a-row>
        </a-col>

        <a-row class="goods-form-modal">
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
        </a-row>
    </a-row>
</template>

<script>
    const ICON_STYLE = { fontSize: '28px', color: '#ff2c39' };
    import { ptCodeOrUnit } from '@common/utils/productType';
    import { setIcon, setDisabled, iconGroup } from '@components/modal/utils/formConfig';
    import Modal from '@components/modal';
    import NP from 'number-precision';
    import accounting from 'accounting';
    export default {
        name: "goodsInfo",
        components: { Modal },
        props: {
            goodsInfo: {
                required: true,
                type: Object,
                default: () => ({})
            }
        },
        data() {
            return {
                storage: this.goodsInfo.specification.arr[0].num,
                capacity: 35,
                number: 1,
                ptCodeOrUnit: ptCodeOrUnit,
                isCollect: false,
                iconStyle: ICON_STYLE,
                goods: this.goodsInfo,

                // modal data
                modalShow: false,
                loading: false,
                formData: [],
                formItems: {}
            }
        },
        computed: {
            collectStyle() {
                return this.isCollect ? 'filled' : 'twoTone';
            },

            maxValue() {
                const item = this.goods.specification.arr.find(item => item.content === this.capacity);
                return item.num;
            },

            RMB: {
                get() {
                    return accounting.formatMoney(this.goodsInfo.price, '￥', 2, ',')
                }
            }
        },
        watch: {
            goodsInfo(value) { this.goods = value; }
        },
        methods: {
            collect() {
                this.isCollect = !this.isCollect;
            },

            capacityChange(e) {
                const item = this.goods.specification.arr.find(item => item.content === e.target.value);
                this.goods.price = NP.round(NP.times(item.price, this.number), 2);
                this.storage = item.num;
            },

            numberChange(value) {
                const item = this.goods.specification.arr.find(item => item.content === this.capacity);
                this.goods.price = NP.round(NP.times(item.price, value), 2)
            },

            colSpan(span) {
                return { span }
            },

            createData() {
                this.fetchModalData();
                this.modalShow = true;
            },

            fetchModalData() {
                this.loading = true;
                let timer = setTimeout(() => {
                    this.$axios.get('/modal/goodsInfo').then(res => {
                        const { data, code} = res.data;
                        if (code === 200) {
                            // 排序，设置 icon、disabled、required、单选框的默认值等，都在这里进行，封装一个公共方法
                            data.formItems = setIcon(data.formItems, iconGroup());

                            data.formItems.forEach(item => {
                                if (item.label === '兴趣标签') {
                                    item.option = setDisabled(item.option, ['抖音', '知乎']);
                                }
                            });

                            this.formData = data.formItems.sort((a, b) => a.index - b.index);
                            for (let key of data.formItems) {
                                this.$set(this.formItems, key.label, undefined);
                                // this.formItems[key.label] = undefined;
                            }
                            console.log(this.formData, this.formItems);
                        } else {
                            throw new Error('request failed !');
                        }
                    }).catch((err) => {
                        this.$message.warn({ title: '提 示', content: '新建数据接口调用失败！' });
                        console.warn(err);
                    }).finally(() => {
                        this.loading = false;
                    });
                }, 1500);
                timer = null;
            }
        }
    }
</script>

<style scoped lang="less">
    .goodsInfo {
        width: 1000px;
        border: 1px #333 solid;

        .operation {
            padding-left: 42px;
        }

        .img {
            vertical-align: bottom;
            border-top-right-radius: @border-radius-def;
            border-top-left-radius: @border-radius-def;
        }

        .icon-collect {
            margin-right: 6px;
            font-size: 24px;
            position: absolute;
            right: 10px;
            bottom: 10px;
            cursor: pointer;
        }

        .goods-form-modal {
            position: absolute;
            bottom: 20px;
            right: 20px;
        }

        /deep/ .ant-card {
            width: 482px;
            border-radius: @border-radius-def;
            position: relative;
        }

        /deep/ .ant-form-item {
            font-size: @font-big;
        }

        /deep/ .ant-form-item-label {
            font-size: @font-big;
            font-weight: bolder;
        }
    }
</style>