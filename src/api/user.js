import {request} from "../utils/request.js";

export function login(params){
    return request("/front/user/login",params,'POST');
}
export function getVerifyCode(params){
    return request('/front/user/getVerifyCode',params,'GET');
}
export function register(params){
    return request('/front/user/register',params,'POST');
}
export function getMailCode(params){
    return request('/front/user/getMailCode',params,'GET');
}
export function reset(params){
    return request('/front/user/resetPassword',params,'POST');
}
export function getMyData(params){
    return request('/front/user/my',params,'GET');
}
export function logout(params){
    return request('/front/user/logout',params,'POST');
}
export function getUserData(params){
    return request('/front/user',params,'GET');
}
export function updateMyAvatar(params){
    return request('/front/user/my/updateAvatar',params,'POST');
}
export function updateMyData(params){
    return request('/front/user/my/update',params,'POST');
}
export function updatePassword(params){
    return request('/front/user/updatePassword',params,'POST');
}
