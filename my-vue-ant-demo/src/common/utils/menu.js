export const demoNav = () => ([
    {
        key: '/demo',
        label: 'Demo',
        icon: 'code-sandbox',
        children: [
            { key: '/demo/cart', icon: 'shopping-cart', label: '购物车' },
            { key: '/demo/dynamicTable', icon: 'table', label: '动态表格' },
        ]
    },

    {
        key: '/mall',
        label: 'Mall',
        icon: 'shop'
    }
]);