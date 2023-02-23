import {request} from "../utils/request.js";

export function getConfig(params){
    return request('/front/config',params,'GET');
}
export function getMenu(params){
    return request('/front/menu',params,'GET');
}
export function getMaster(params){
    return request('/front/master',params,'GET');
}
export function getCount(params){
    return request('/front/count',params,'GET');
}
export function getPartner(params){
    return request('/front/partner',params,'GET');
}