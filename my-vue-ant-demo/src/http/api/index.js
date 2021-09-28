// import { get, post } from "../index";
// export const fetchMallGoodsInfo = (params) => get('/mall/goodsInfo', params);

// -------------------

import $http from "./axios";
export const fetchMallGoodsInfo = (params) => $http.get('/mall/goodsInfo', params);