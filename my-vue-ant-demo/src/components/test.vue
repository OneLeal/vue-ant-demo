<template>
    <div>
        <a-row>
            <a-col :span="6">测试组件</a-col>
            <a-col :span="6">测试组件</a-col>
            <a-col :span="6">测试组件</a-col>
            <a-col :span="6">测试组件</a-col>
        </a-row>

        <a-button type="primary">点 击</a-button>

        <div class="bg ml-20">{{ name }}</div>
    </div>
</template>

<script>
    export default {
        name: "test",
        data() {
            return {
                name: '一条小团团'
            }
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