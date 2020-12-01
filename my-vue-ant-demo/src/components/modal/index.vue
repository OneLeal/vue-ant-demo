<template>
    <a-modal
            :title="title"
            :visible="visible"
            :okText="okText"
            :cancelText="cancelText"
            :maskClosable="false"
            :confirmLoading="btnLoading"
            :okButtonProps="{ props: { disabled: loading } }"
            @ok="handleOk"
            @cancel="handleCancel"
    >
        <a-spin :spinning="loading" tip="加载中...">
            <template v-if="loading">
                <div class="mt-20 mb-20"/>
            </template>

            <template v-else>
                <template v-if="isEmpty">
                    <a-row>暂无内容</a-row>
                </template>

                <template v-else>
                    <a-form-model ref="form" :model="formItems" :rules="rules">
                        <template v-for="item in formData">
                            <a-form-model-item
                                    :label="item.label"
                                    :prop="item.label"
                                    :key="item.label"
                                    :labelCol="colSpan(4)"
                                    :wrapperCol="colSpan(20)"
                            >
                                <ModalItem
                                        :itemType="item.type"
                                        :opts="item.option"
                                        :keyName="item.label"
                                        :icon="item.icon || ''"
                                        :value="formItems[item.label]"
                                        @change="onChange"
                                />
                            </a-form-model-item>
                        </template>
                    </a-form-model>
                </template>
            </template>
        </a-spin>
    </a-modal>
</template>

<script>
    import ModalItem from './components/modalItem';
    import {rules} from './utils/rules';
    export default {
        components: {ModalItem},
        props: {
            title: {type: String, default: '新建数据'},
            formData: {type: Array, default: ([])},
            formItems: {
                type: Object, default: ({})
            },
            visible: {type: Boolean, default: false},
            cancelText: {type: String, default: '取 消'},
            okText: {type: String, default: '确 定'},
            loading: {type: Boolean, default: false}
        },
        data() {
            return {
                btnLoading: false
            }
        },
        model: {
            prop: 'visible',
            event: 'cancel'
        },
        computed: {
            isEmpty() {
                return !this.formData || this.formData.length === 0;
            },

            rules() {
                return rules();
            }
        },
        methods: {
            colSpan(span) {
                return {span}
            },

            onChange(value) {
                if (this.formItems.hasOwnProperty([value.key])) {
                    this.formItems[value.key] = value.val;
                }
            },

            handleOk() {
                console.log('Clicked submit button');
                // 校验表单
                this.$refs.form.validate((bool, obj) => {
                    console.log(bool, obj);

                    if (bool) {
                        console.log('提交表单：', this.formItems);

                        // 模拟发送请求，提价表单
                        this.btnLoading = true;
                        let timer = setTimeout(() => {
                            this.btnLoading = false;
                        }, 1500);
                        timer = null;

                        // 发送成功
                        this.$message.success('创建数据成功 !');
                        this.handleCancel();
                    }
                });
            },

            handleCancel() {
                this.$emit('change', false);
            },
        }
    }
</script>