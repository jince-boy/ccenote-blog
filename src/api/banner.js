import {request} from "../utils/request.js";

export function getBannerList(params){
    return request('/front/banner',params,'GET');
}