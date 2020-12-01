// 一份副本，不同的封装方式（推荐使用这一种）
import axios from 'axios';

const service = axios.create({
    baseURL: '/api', // 设置baseUr地址,如果通过proxy跨域可直接填写base地址
    headers: {
        post: {"Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"}  // 定义统一的请求头部
    },
    timeout: 20000,
    withCredentials: true // 如果用的JSONP，可以配置此参数带上cookie凭证，如果是代理和CORS不用设置
});

service.interceptors.request.use(config => {
    // do something
    // 比如判断是否登录 store.state.isLogin
    return config;
}, error => {
    return Promise.reject(error);
});

axios.interceptors.response.use(response => {
    if (response.status === 200) {
        return Promise.resolve(response);
    } else if (response.status === 401) {
        // 未登录则跳转登录页面，并携带当前页面的路径
        // 在登录成功后返回当前页面，这一步需要在登录页操作。
        // this.$router.replace({
        //     path: '/login',
        //     query: {
        //         redirect: router.currentRoute.fullPath
        //     }
        // });
        return Promise.resolve(response);
    } else if (response.status === 403) {
        // 无权限或者 token 过期，需要重新登录(同上)
        return Promise.resolve(response);
    } else {
        return Promise.reject(response);
    }
}, error => {
    console.warn(error || '网络异常，请稍后重试！');
});

export default service;