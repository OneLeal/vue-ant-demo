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
    </a-row>
</template>

<script>
    const ICON_STYLE = { fontSize: '28px', color: '#ff2c39' };
    import { ptCodeOrUnit } from '@common/utils/productType';
    import NP from 'number-precision';
    import accounting from 'accounting';
    export default {
        name: "goodsInfo",
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