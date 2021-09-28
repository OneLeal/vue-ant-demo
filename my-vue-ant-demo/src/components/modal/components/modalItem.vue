<template>
    <a-row>
        <template v-if="itemType == 0">
            <a-input :value="value" placeholder="Please Input" @change="onChange" allowClear>
                <a-icon slot="suffix" :type="icon" v-if="icon !== ''" />
            </a-input>
        </template>

        <template v-else-if="itemType == 1">
            <a-radio-group :value="value" :options="opts" @change="onChange" />
        </template>

        <template v-else-if="itemType == 2">
            <a-checkbox-group
                    :value="value"
                    :options="opts"
                    @change="onChange"
            />
        </template>

        <template v-else-if="itemType == 3">
            <a-date-picker
                    :locale="locale"
                    :value="value"
                    @change="onChange" />
        </template>

        <template v-else-if="itemType == 4">
            <a-textarea placeholder="Basic usage" :rows="4" :value="value" @change="onChange" />
        </template>
    </a-row>
</template>

<script>
    import locale from 'ant-design-vue/es/date-picker/locale/zh_CN';
    import moment from 'moment';
    import 'moment/locale/zh-cn';
    moment.locale('zh-cn');

    export default {
        name: "modalItem",
        props: {
            itemType: { type: [String, Number], default: 0 },
            keyName: { type: String, required: true },
            opts: { type: Array, default: () => [] },
            icon: { type: String, default: '' },
            value: { default: undefined }
        },
        data() {
            return {
                locale
            }
        },
        methods: {
            onChange(value) {
                let val = null;
                const key = this.keyName;

                if (Array.isArray(value)) {
                    val = value;
                } else if (value instanceof moment) {
                    val = value.format('YYYY-MM-DD');
                } else if (value instanceof Event || value instanceof Object) {
                    val = value.target.value;
                }

                this.$emit('change', { key, val });
            }
        }
    }
</script>

<style scoped>

</style>