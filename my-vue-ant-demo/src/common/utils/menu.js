export const demoNav = () => ([
    {
        key: '/demo',
        label: 'Demo',
        icon: 'codepen',
        children: [
            { key: '/demo/cart', icon: 'shopping-cart', label: '购物车' },
            { key: '/demo/dynamicTable', icon: 'table', label: '动态表格' },
            { key: '/demo/goodsCard', icon: 'shopping', label: '物品卡片' },
        ]
    },

    {
        key: '/mall',
        label: 'Mall',
        icon: 'shop'
    }
]);