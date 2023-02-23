import {request} from "../utils/request.js";

export function getTagAll(params){
    return request('/front/tag/list',params,'GET');
}