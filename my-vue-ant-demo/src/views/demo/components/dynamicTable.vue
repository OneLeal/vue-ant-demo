<template>
    <div>
        <p>动态表格</p>
        <p>测试请求</p>
    </div>
</template>

<script>
    import { fetchMallGoodsInfo } from '../../../http/api';
    export default {
        name: "DynamicTable",
        methods: {
            async init() {
                // TODO: fixed the request.
                const { code, msg, data } = await fetchMallGoodsInfo();
                console.log(code, msg, data);
            }
        },
        created() {
            this.init();
        }
    }
</script>

<style scoped>

</style>