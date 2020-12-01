import axios from 'axios';

axios.defaults.baseURL = '/api';
axios.defaults.timeout = 20000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'; // 非必须

// import store from 'store';
// 请求拦截器
axios.interceptors.request.use(config => {
    // do something
    // 比如判断是否登录 store.state.isLogin
    return config;
}, error => {
    return Promise.reject(error);
});

// 响应拦截器
axios.interceptors.response.use(response => {
    if (response.status === 200) {
        return Promise.resolve(response);
    } else {
        return Promise.reject(response);
    }
}, error => {
    const code = error.response?.status;
    if (code) {
        switch (code) {
            case 401:
                // 未登录则跳转登录页面，并携带当前页面的路径
                // 在登录成功后返回当前页面，这一步需要在登录页操作。
                // this.$router.replace({
                //     path: '/login',
                //     query: {
                //         redirect: router.currentRoute.fullPath
                //     }
                // });
                break;

            case 403:
                // 无权限或者 token 过期，需要重新登录
                // 引入 UI库 提示组件给出弹框提示
                // 重新登录同上
                break;
            case 404:
                // 提示错误
                break;
            default:
                // 提示错误
                console.warn(error.response.data);
                break;
        }
    } else {
        return Promise.reject(error);
    }
});

export const get = (url, params) => {
    return new Promise((resolve, reject) => {
        axios.get(url, {params})
            .then(res => resolve(res.data))
            .catch(err => reject(err));
    });
};

export const post = (url, params) => {
    return new Promise((resolve, reject) => {
        axios.post(url, params)
            .then(res => resolve(res.data))
            .catch(err => reject(err))
    });
};
