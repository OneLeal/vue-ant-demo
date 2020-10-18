<template>
    <div>
        <a-row>
            <a-col :span="6">测试组件</a-col>
            <a-col :span="6">测试组件</a-col>
            <a-col :span="6">测试组件</a-col>
            <a-col :span="6">测试组件</a-col>
        </a-row>

        <a-button type="primary" @click="newPage">点 击</a-button>

        <div v-for="item in arr" :key="item.id">
            <div>{{ item.label }}</div>
            <img :src="item.img" :alt="item.details">
        </div>

        <div class="bg ml-20">{{ name }}</div>
    </div>
</template>

<script>
    export default {
        name: "test",
        data() {
            return {
                name: '一条小团团',
                arr: [],
            }
        },
        methods: {
            newPage() {
                let routeData = this.$router.resolve({ path: '/test', query: { product: 'mall' } });
                window.open(routeData.href, '_blank');
            }
        },
        mounted() {
            this.$axios.get('/mall').then(res => {
                const { data } = res.data;
                this.arr = data.goods;
                console.log(data.goods);
                let count = 0;
                this.arr.forEach(i => {
                    if (i.star)
                        count++;
                });
                console.log(count);
            });
        }
    }
</script>

<style lang="less" scoped>
    .bg {
        width: 100px;
        height: 100px;
        line-height: 100px;
        text-align: center;
        background-color: @color-green;
        font-size: @font-large;
        color: @color-red;
        font-weight: bolder;
    }
</style>