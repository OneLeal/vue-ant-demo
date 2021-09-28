export const iconGroup = () => ({
    user: ['姓名', '用户', '会员'],
    tablet: ['手机', '手机号'],
    edit: ['留言', '编辑', '修改']
});

/*
* arr: Array | 表单数组
* iconGroup: Array | 图标集合
* */
export const setIcon = (arr, iconGroup) => {
    return arr.map(item => {
        for (let iconName in iconGroup) {
            if (iconGroup[iconName].includes(item.label)) {
                item.icon = iconName;
            }
        }
        return item;
    });
};

/*
* arr: Array | checkbox.options | radio.options
* disabledGroup: Array | ['抖音', '知乎']
* */
export const setDisabled = (arr, disabledGroup) => {
    return arr.map(item => {
        if (disabledGroup.includes(item.label)) {
            item.disabled = true;
        }
        return item;
    });
};