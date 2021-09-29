export const waitUnitl = (fn, timeout = 10000, interval = 150) => {
    let intervalID, res, rej, count = 0;
    const promise = new Promise((resolve, reject) => {
        res = resolve;
        rej = reject;
    });
    const executor = async () => {
        const result = await fn();
        if (result) {
            clearInterval(intervalID);
            res(result);
        } else {
            if (++count * interval >= timeout) {
                clearInterval(intervalID);
                rej(new Error('waitUnitl 超时'));
            }
        }
    };
    intervalID = setInterval(executor, interval);
    executor();
    return promise;
};

export const cloneEasy = list => JSON.parse(JSON.stringify(list));

export const hasValue = value => !(value == null || value === '');

export const hasValueOfArray = arr => arr.every(hasValue);

export const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

export const getStringLength = (str) => {
    if (typeof str === 'string') {
        const arr = str.match(/[^\x00-\xff]/gi) || [];
        return str.length + (arr == null ? 0 : arr.length);
    }
    return 0;
};

export const defType = (def = {}, config = {}) => ({
    type: Object(def).constructor,
    default: () => def,
    ...config
});

export const getType = (obj) => {
    const toString = Object.prototype.toString;
    const map = {
        '[object Boolean]': 'boolean',
        '[object Number]': 'number',
        '[object String]': 'string',
        '[object Function]': 'function',
        '[object Array]': 'array',
        '[object Data]': 'date',
        '[object RegExp]': 'regExp',
        '[object Undefined]': 'undefined',
        '[object Null]': 'null',
        '[object Object]': 'object',
        '[object Error]': 'error',
    };
    if (obj instanceof Element) {
        return 'element';
    } 
    return map[toString.call(obj)];
};

export const fmt = {
    selectOption(list, valueProp, labelProp, deep = true) {
        const type = getType(valueProp);
        list = deep ? cloneEasy(list) : list;
        return list.map(item => {
            if (type === 'object') {
                for (const key in valueProp) {
                    item[key] = item[valueProp[key]];
                }
                return item;
            } else {
                const label = item[labelProp];
                const value = item[valueProp];
                return Object.assign(item, { label, value });
            }
        });
    }
};