// 是否为 vant 表单组件
export const isVanForm = (vm) => {
    try {
        return ['vanForm', 'van-form'].includes(vm.$options._componentTag);
    } catch (error) { return false; }
};

// 自定义校验触发(滚动报错)
export const selValidate = async (vm, method, options) => {
    if (method) {
        try {
            const tag = vm.$vnode.tag || '';
            const { name } = vm.$options;
            const result = await method();
            if (result === false) {
                throw new Error('校验不通过！'); // 非 Boolean 值不做处理
            }
        } catch (error) {
            errorScroll(vm, undefined, options);
            throw error;
        }
    }
};

// 触发 vant 表单组件的校验方法并滚动
export const validateForm = async (vm, options, names) => {
    const handleError = async (errors) => {
        await errorScroll(vm, errors, options);
        vm.scrollToField(errors[0].name);
    };

    try {
        await vm.validate(names);
    } catch (errors) {
        handleError(errors);
        throw errors;
    }
    
    await vm.validate(names);
};

// 滚动报错
export const errorScroll = async (vm, error, options) => {
    let target = vm;
    while (!target.$el.scrollIntoView) {
        target = target.$parent;
    }
    target.$el.scrollIntoView();
    // target.$el.scrollIntoViewIfNeeded();
};

/**
 * 全自动校验方法 组件遍历
 * 1. 对 vanForm 组件进行校验;
 * 2. 对自定义了 onValidate 方法的组件进行校验;
 */
export const onValidate = async (list = [], options = {}) => {
    if (list.length) {
        for (let vm of list) {
            if (isVanForm(vm)) {
                await validateForm(vm, options);
            } else {
                const { onValidate: method } = vm || {};
                if (method) {
                    await selValidate(vm, method, options);
                    continue;
                }
            }
            await onValidate(vm.$children || [], options);
        }
    }
};