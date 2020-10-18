// 产品大类
export const productType = () => ({
    SKIN: '00004411',
});

export const productCodeMap = () => ({
    capacity: '容量',
    color: '颜色',
    size: '尺寸'
});

export const productUnit = () => ({
    capacity: 'ml',
    size: '英寸'
});

export const ptCodeOrUnit = (code, flag = 0) => {
    const gather = flag ?  productCodeMap() : productUnit();
    return gather[code];
};