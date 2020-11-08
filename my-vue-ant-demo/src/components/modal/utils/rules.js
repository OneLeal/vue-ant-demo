export const rules = () => ({
    姓名: [{ required: true, message: '不能为空' }],
    权限: [{ required: true, message: '不能为空' }],
    年龄: [{ required: true, message: '不能为空' }],
    性别: [{ required: true, message: '必填项' }],
    出生日期: [{ required: true, message: '不能为空' }],
    手机号: [{ required: true, message: '不能为空' }, { validator: validatorPhone }]
});

export const validatorPhone = (rule, value, callback) => {
    const pat = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
    console.log(value);
    if(!(pat.test(value))){
        callback('手机号格式不正确');
    }
    callback();
};