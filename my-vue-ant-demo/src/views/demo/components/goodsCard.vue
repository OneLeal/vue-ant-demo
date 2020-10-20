<template>
    <a-card class="goodsCard clearFix scale">
        <div class="img-wrap"><img slot="cover" :alt="goodsCard.details" :src="goodsCard.img" /></div>
        <ul class="info-wrap">
            <li class="title omit">
                <a-tooltip overlayClassName="card-tooltip" placement="topLeft" :title="goodsCard.label">
                    <span>{{ goodsCard.label }}</span>
                </a-tooltip>
            </li>
            <li><span class="price">{{ RMB }}</span></li>
            <li><a-rate :default-value="goodsCard.star" allow-half disabled /></li>
            <li><span class="sale">{{ goodsCard.sale }}</span></li>
        </ul>
        <div class="icon-collect" @click="collect">
            <a-icon :style="iconStyle" :theme="collectStyle" type="heart" />
        </div>
    </a-card>
</template>

<script>
    const ICON_STYLE = { fontSize: '28px', color: '#ff2c39' };
    import accounting from 'accounting';
    export default {
        name: "goodsCard",
        props: {
            goodsCard: {
                type: Object,
                required: true,
                default: () => ({})
            }
        },
        data() {
            return {
                iconStyle: ICON_STYLE,
                isCollect: false
            }
        },
        computed: {
            collectStyle() {
                return this.isCollect ? 'filled' : 'twoTone';
            },

            RMB: {
                get() {
                    return accounting.formatMoney(this.goodsCard.price, '￥', 2, ',')
                }
            }
        },
        methods: {
            collect() {
                this.isCollect = !this.isCollect
            }
        },
        created() {

        }
    }
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
            content: '已售：';
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
            content: '价格：';
            font-size: @font-big;
            color: @color-black;
            font-weight: bolder;
        }
    }
</style>