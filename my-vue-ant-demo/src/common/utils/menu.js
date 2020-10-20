export const demoNav = () => ([
    {
        key: '/demo',
        label: 'Demo',
        icon: 'bars',
        children: [
            { key: '/demo/cart', icon: 'shopping-cart', label: '购物车' },
            { key: '/demo/dynamicTable', icon: 'table', label: '动态表格' },
            { key: '/demo/goodsCard', icon: 'account-book', label: '商品卡片' },
            { key: '/demo/goodsInfo', icon: 'shopping', label: '商品信息' },
        ]
    },

    {
        key: '/mall',
        label: 'Mall',
        icon: 'shop'
    }
]);