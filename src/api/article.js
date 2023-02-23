import {request} from "../utils/request.js";

export function newCommentList(params){
    return request('/front/article/comment/new',params,'GET');
}
export function hotArticle(params){
    return request('/front/article/hotArticle',params,'GET');
}
export function getArticleList(params){
    return request('/front/article/list',params,'GET');
}
export function getArticle(params){
    return request('/front/article',params,'GET');
}
export function searchArticle(params){
    return request('/front/article/search',params,'GET');
}
export function getCategoryArticle(params){
    return request('/front/category',params,'GET');
}
export function getTagArticle(params){
    return request('/front/tag',params,'GET');
}
export function getCommentList(params){
    return request('/front/article/comment/getArticleCommentList',params,'GET');
}
export function addComment(params){
    return request('/front/article/comment/add',params,'POST');
}