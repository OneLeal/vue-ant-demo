// 另一种封装方式
import instance from '../request';
import { message } from "ant-design-vue";
// import { Message,Loading } from 'element-ui';

/**
 * 核心函数，可通过它处理一切请求数据，并做横向扩展
 * @param {url} 请求地址
 * @param {params} 请求参数
 * @param {options} 请求配置，针对当前本次请求；
 * @param loading 是否显示loading
 * @param error 本次是否显示错误
 */
const request = (url, params, options = {loading: true, error: true}, method) => {
    // let loadingInstance;
    // 请求前loading
    // if (options.loading) loadingInstance = Loading.service();
    return new Promise((resolve, reject) => {
        let data = {};
        // get请求使用params字段
        if (method === 'get') data = {params};
        // post请求使用data字段
        if (method === 'post') data = {data: params};
        instance({
            url,
            method,
            ...data
        }).then((res) => {
            // 此处作用很大，可以扩展很多功能。
            // 比如对接多个后台，数据结构不一致，可做接口适配器
            // 也可对返回日期/金额/数字等统一做集中处理
            if (res.status === 200) {
                resolve(res.data);
            } else {
                // 通过配置可关闭错误提示
                // if (options.error) Message.error(res.data.msg);
                options.error && message.warning(res.data.msg);
                reject(res);
            }
        }).catch((error) => {
            // Message.error(error)
            message.error(error);
            console.warn(error);
        }).finally(() => {
            // loadingInstance.close();
        })
    })
};

// 封装GET请求
const get = (url, params, options) => {
    return request(url, params, options, 'get')
};

// 封装POST请求
const post = (url, params, options) => {
    return request(url, params, options, 'post')
};

export default {
    get, post
}